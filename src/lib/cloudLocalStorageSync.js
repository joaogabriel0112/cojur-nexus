import { supabase, isSupabaseConfigured } from "./supabaseClient";

const EXCLUDED_KEY_PREFIXES = [
  "sb-",
  "supabase.",
  "cojur-cloud-",
];

let originalSetItem = null;
let originalRemoveItem = null;
let originalClear = null;
let saveTimer = null;
let isRestoring = false;

function shouldSyncKey(key) {
  if (!key || typeof key !== "string") return false;
  return !EXCLUDED_KEY_PREFIXES.some((prefix) => key.startsWith(prefix));
}

function safeGetLocalStorage() {
  try {
    return window.localStorage;
  } catch (error) {
    console.error("localStorage indisponível:", error);
    return null;
  }
}

function getStoragePrototype() {
  try {
    if (typeof window === "undefined" || !window.Storage) return null;
    return window.Storage.prototype;
  } catch (error) {
    console.error("Storage API indisponível:", error);
    return null;
  }
}

export function readLocalStorageSnapshot() {
  const storage = safeGetLocalStorage();
  const snapshot = {};

  if (!storage) return snapshot;

  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!shouldSyncKey(key)) continue;
    snapshot[key] = storage.getItem(key);
  }

  return snapshot;
}

export function restoreLocalStorageSnapshot(snapshot) {
  const storage = safeGetLocalStorage();
  if (!storage || !snapshot || typeof snapshot !== "object") return;

  isRestoring = true;

  try {
    Object.entries(snapshot).forEach(([key, value]) => {
      if (!shouldSyncKey(key)) return;
      if (typeof value === "string") {
        storage.setItem(key, value);
      }
    });
  } finally {
    isRestoring = false;
  }
}

async function getAuthenticatedUser() {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Erro ao obter usuário Supabase:", error);
    return null;
  }

  return data?.user ?? null;
}

export async function loadCloudLocalStorage() {
  if (!isSupabaseConfigured || !supabase) {
    console.warn("Supabase não configurado. O app funcionará apenas neste navegador.");
    return { loaded: false, reason: "missing-config" };
  }

  const user = await getAuthenticatedUser();

  if (!user) {
    return { loaded: false, reason: "not-authenticated" };
  }

  const { data, error } = await supabase
    .from("cojur_state")
    .select("data")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Erro ao carregar dados do Supabase:", error);
    return { loaded: false, reason: "load-error", error };
  }

  const cloudLocalStorage = data?.data?.localStorage;

  if (cloudLocalStorage && typeof cloudLocalStorage === "object") {
    restoreLocalStorageSnapshot(cloudLocalStorage);
    return { loaded: true, reason: "loaded-from-cloud" };
  }

  await saveCloudLocalStorage();
  return { loaded: true, reason: "initialized-cloud" };
}

export async function saveCloudLocalStorage() {
  if (!isSupabaseConfigured || !supabase) return { saved: false, reason: "missing-config" };

  const user = await getAuthenticatedUser();

  if (!user) return { saved: false, reason: "not-authenticated" };

  const payload = {
    localStorage: readLocalStorageSnapshot(),
    updatedAt: new Date().toISOString(),
    version: 1,
  };

  const { error } = await supabase
    .from("cojur_state")
    .upsert({
      user_id: user.id,
      data: payload,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error("Erro ao salvar dados no Supabase:", error);
    return { saved: false, reason: "save-error", error };
  }

  return { saved: true, reason: "saved" };
}

function scheduleSave() {
  if (isRestoring) return;

  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    saveCloudLocalStorage();
  }, 700);
}

export function installCloudLocalStorageSync() {
  const storage = safeGetLocalStorage();
  const storagePrototype = getStoragePrototype();

  if (!storage || !storagePrototype || !isSupabaseConfigured || !supabase) return;

  if (originalSetItem || originalRemoveItem || originalClear) return;

  originalSetItem = storagePrototype.setItem;
  originalRemoveItem = storagePrototype.removeItem;
  originalClear = storagePrototype.clear;

  storagePrototype.setItem = function cojurCloudSetItem(key, value) {
    originalSetItem.call(this, key, value);
    if (this === window.localStorage && shouldSyncKey(key)) scheduleSave();
  };

  storagePrototype.removeItem = function cojurCloudRemoveItem(key) {
    originalRemoveItem.call(this, key);
    if (this === window.localStorage && shouldSyncKey(key)) scheduleSave();
  };

  storagePrototype.clear = function cojurCloudClear() {
    originalClear.call(this);
    if (this === window.localStorage) scheduleSave();
  };

  window.addEventListener("beforeunload", () => {
    saveCloudLocalStorage();
  });
}
