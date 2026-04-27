create table if not exists public.cojur_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.cojur_state enable row level security;

drop policy if exists "cojur_state_select_own" on public.cojur_state;
drop policy if exists "cojur_state_insert_own" on public.cojur_state;
drop policy if exists "cojur_state_update_own" on public.cojur_state;
drop policy if exists "cojur_state_delete_own" on public.cojur_state;

create policy "cojur_state_select_own"
on public.cojur_state
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "cojur_state_insert_own"
on public.cojur_state
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "cojur_state_update_own"
on public.cojur_state
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "cojur_state_delete_own"
on public.cojur_state
for delete
to authenticated
using ((select auth.uid()) = user_id);
