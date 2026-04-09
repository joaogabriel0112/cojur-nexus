# COJUR NEXUS — Deploy Vercel + Supabase

## PASSO 1 — Supabase (banco de dados)

1. Acesse https://supabase.com e crie uma conta gratuita
2. Clique em "New project" → dê o nome "cojur-nexus"
3. Aguarde o projeto iniciar (~2 min)
4. No menu lateral, clique em **SQL Editor**
5. Cole e execute o seguinte SQL:

```sql
create table nexus_state (
  user_id text primary key,
  data text not null,
  updated_at timestamptz default now()
);
alter table nexus_state enable row level security;
create policy "acesso_publico" on nexus_state for all using (true);
```

6. Vá em **Settings → API**
7. Copie:
   - **Project URL** (ex: https://abcxyz.supabase.co)
   - **anon public key** (chave longa)

---

## PASSO 2 — GitHub (repositório)

1. Acesse https://github.com e crie uma conta se não tiver
2. Clique em "New repository" → nome: `cojur-nexus` → Public → Create
3. No seu computador, instale o Git se necessário
4. Execute no terminal dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "COJUR Nexus v16"
git remote add origin https://github.com/SEU_USUARIO/cojur-nexus.git
git push -u origin main
```

---

## PASSO 3 — Vercel (hospedagem)

1. Acesse https://vercel.com e crie uma conta (use o login do GitHub)
2. Clique em "Add New Project"
3. Selecione o repositório `cojur-nexus`
4. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL` = a URL do Supabase (Passo 1)
   - `VITE_SUPABASE_ANON_KEY` = a anon key do Supabase (Passo 1)
5. Clique em **Deploy**
6. Aguarde ~1 minuto

Você receberá uma URL como: `https://cojur-nexus.vercel.app`

---

## RESULTADO

- Acesse o app de qualquer dispositivo via a URL da Vercel
- Todos os dados ficam salvos no Supabase automaticamente
- Alterações num computador aparecem no outro (recarregue a página)
- O app também funciona offline com cache local

---

## ATUALIZAÇÕES FUTURAS

Quando eu gerar uma nova versão do App.jsx:
1. Substitua o arquivo `src/App.jsx` pelo novo
2. Execute: `git add . && git commit -m "v17" && git push`
3. A Vercel faz o deploy automático em ~30 segundos

