-- ═══════════════════════════════════════════════════════════════════
-- COJUR NEXUS · SETUP SUPABASE · v42.2 (CORRIGIDO)
-- ═══════════════════════════════════════════════════════════════════
-- Rodar este script UMA VEZ no SQL Editor do Supabase.
-- Funciona em tabela nova OU em tabela ja existente de versao anterior.
-- Nao destroi dados existentes.
-- ═══════════════════════════════════════════════════════════════════

-- 1. Criar tabela se nao existir (coluna 'data' jsonb, como o app v42 espera)
create table if not exists public.nexus_state (
  user_id     text        primary key,
  data        jsonb,
  updated_at  timestamptz not null default now()
);

-- 2. Garantir que a coluna 'data' existe (caso a tabela tenha sido criada
--    em versao antiga com nome diferente, tipo 'value' ou 'state_json')
alter table public.nexus_state
  add column if not exists data jsonb;

-- 3. Garantir que updated_at existe e tem default
alter table public.nexus_state
  add column if not exists updated_at timestamptz not null default now();

-- 4. Habilitar Row Level Security (obrigatorio em tabelas publicas)
alter table public.nexus_state enable row level security;

-- 5. Drop policies anteriores se houver (idempotencia)
drop policy if exists "nexus_state_select_all" on public.nexus_state;
drop policy if exists "nexus_state_insert_all" on public.nexus_state;
drop policy if exists "nexus_state_update_all" on public.nexus_state;
drop policy if exists "nexus_state_delete_all" on public.nexus_state;

-- 6. Politicas permissivas (uso solo). Anon key pode ler/escrever qualquer user_id.
create policy "nexus_state_select_all"
  on public.nexus_state for select
  using (true);

create policy "nexus_state_insert_all"
  on public.nexus_state for insert
  with check (true);

create policy "nexus_state_update_all"
  on public.nexus_state for update
  using (true) with check (true);

create policy "nexus_state_delete_all"
  on public.nexus_state for delete
  using (true);

-- 7. Trigger para atualizar updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists nexus_state_set_updated_at on public.nexus_state;
create trigger nexus_state_set_updated_at
  before update on public.nexus_state
  for each row execute function public.set_updated_at();

-- 8. Inserir seed do usuario (so se ainda nao houver row)
insert into public.nexus_state (user_id, data)
  values (
    'joao_gabriel_cojur',
    '{"adm":[],"jud":[],"reun":[],"sust":[],"viag":[],"inbox":[],"realizados":[],"notas":[],"lembretes":[],"auditLog":[]}'::jsonb
  )
  on conflict (user_id) do nothing;

-- 9. Verificacao final
select
  user_id,
  case when data is null then 'VAZIO' else 'OK ('||length(data::text)||' bytes)' end as estado,
  updated_at
from public.nexus_state
order by updated_at desc;
