# COJUR Nexus · Deploy

App de gestão de processos jurídicos para COJUR/CFM. Stack: React 18 + Vite + Supabase + Vercel.

## Estrutura do repo

```
cojur-nexus/
├── index.html              ← entry HTML
├── package.json            ← dependências
├── vite.config.js          ← config do bundler
├── vercel.json             ← config de deploy
├── supabase_setup.sql      ← rodar 1x no Supabase
├── .gitignore
└── src/
    ├── main.jsx            ← bootstrap React
    └── App.jsx             ← app inteiro (v42)
```

## Setup (3 etapas, ~15 min)

### 1. Supabase
- Abrir o projeto `vcxastdcsbzdsfcdbtan` no painel
- SQL Editor → New query → colar `supabase_setup.sql` → Run
- Em Settings → API, copiar a `anon public` key (já está no `index.html` por default)

### 2. GitHub
- Criar repo novo (público ou privado)
- Subir todos os arquivos via Web UI (Add file → Upload files)
- Commit direto na `main`

### 3. Vercel
- Importar o repo (Add New → Project → escolher o repo do GitHub)
- Framework Preset: **Vite** (detectado automaticamente)
- Build Command: `npm run build` (já no `vercel.json`)
- Output Directory: `dist`
- Clicar Deploy

## Atualizando

Toda vez que editar `src/App.jsx`:
- Commit no GitHub via Web UI
- Vercel rebuilda automaticamente (~1 min)
- Vai para a URL de produção

## Env vars (opcional)

O `index.html` já tem os defaults via `window.__COJUR_ENV__`. Se quiser sobrescrever sem editar o HTML, no painel da Vercel (Settings → Environment Variables):

| Nome | Valor |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | anon public key |
| `VITE_SUPABASE_USER_ID` | identificador único (ex: `joao_gabriel_cojur`) |
| `VITE_SUPABASE_TABLE` | `nexus_state` |

## Troubleshooting

- **`Cannot use 'import.meta' outside a module`**: já corrigido na v42.1
- **Tela em branco**: F12 → Console → ver erro. Geralmente é env var faltando.
- **Sync com a nuvem falhou**: verificar RLS no Supabase, e a anon key
- **Dados não persistem entre dispositivos**: confirmar que o mesmo `VITE_SUPABASE_USER_ID` está nos dois

## Backup local

O app já tem export JSON (Configurações → Exportar JSON). Recomendo backup semanal.
