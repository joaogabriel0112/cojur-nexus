import React, { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const shellStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  background: "radial-gradient(circle at top, rgba(0,229,255,.16), transparent 36%), linear-gradient(135deg, #020617, #050816 55%, #000)",
  color: "#e5f7ff",
  fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
};

const cardStyle = {
  width: "100%",
  maxWidth: 440,
  border: "1px solid rgba(0,229,255,.22)",
  borderRadius: 24,
  padding: 28,
  background: "rgba(2, 6, 23, .82)",
  boxShadow: "0 24px 80px rgba(0,0,0,.55), 0 0 50px rgba(0,229,255,.10)",
  backdropFilter: "blur(16px)",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "13px 14px",
  marginTop: 8,
  marginBottom: 14,
  borderRadius: 14,
  border: "1px solid rgba(148, 163, 184, .28)",
  background: "rgba(15, 23, 42, .78)",
  color: "#f8fafc",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 14,
  border: "1px solid rgba(0,229,255,.42)",
  background: "linear-gradient(135deg, rgba(0,229,255,.92), rgba(124,58,237,.82))",
  color: "#020617",
  fontWeight: 800,
  cursor: "pointer",
  marginTop: 4,
};

export default function SupabaseLoginGate({ children, onReady }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const sessionUser = data?.session?.user ?? null;

      if (!mounted) return;

      setUser(sessionUser);
      setLoading(false);

      if (sessionUser && onReady) {
        await onReady();
      }
    }

    init();

    if (!supabase) return () => {
      mounted = false;
    };

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser && onReady) {
        await onReady();
      }
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, [onReady]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!supabase) return;

    setError("");
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message || "Não foi possível entrar no COJUR Nexus.");
    }

    setSubmitting(false);
  }

  if (loading) {
    return (
      <div style={shellStyle}>
        <div style={cardStyle}>Carregando COJUR Nexus...</div>
      </div>
    );
  }

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div style={shellStyle}>
        <div style={cardStyle}>
          <h1 style={{ margin: 0, fontSize: 24 }}>Supabase não configurado</h1>
          <p style={{ lineHeight: 1.6, color: "#cbd5e1" }}>
            Configure na Vercel as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para habilitar a sincronização entre navegadores.
          </p>
          {children}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={shellStyle}>
        <form style={cardStyle} onSubmit={handleSubmit}>
          <div style={{ fontSize: 12, letterSpacing: 2, color: "#67e8f9", fontWeight: 800, marginBottom: 10 }}>
            COJUR NEXUS CLOUD
          </div>
          <h1 style={{ margin: 0, fontSize: 26 }}>Entrar para sincronizar</h1>
          <p style={{ lineHeight: 1.6, color: "#cbd5e1", marginBottom: 22 }}>
            Use o mesmo login em todos os navegadores para carregar e salvar os dados no Supabase.
          </p>

          <label style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>
            E-mail
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
            />
          </label>

          <label style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 700 }}>
            Senha
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Senha do Supabase Auth"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <div style={{ color: "#fecaca", background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.32)", padding: 12, borderRadius: 12, marginBottom: 12 }}>
              {error}
            </div>
          ) : null}

          <button style={buttonStyle} type="submit" disabled={submitting}>
            {submitting ? "Entrando..." : "Entrar no COJUR Nexus"}
          </button>
        </form>
      </div>
    );
  }

  return children;
}
