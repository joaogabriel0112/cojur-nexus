# COJUR Nexus: sincronização entre navegadores com Supabase

Esta versão usa Supabase Auth + uma tabela `cojur_state` para sincronizar os dados salvos no `localStorage` entre navegadores diferentes.

## 1. Variáveis na Vercel

Em `Vercel > Project > Settings > Environment Variables`, crie:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Depois faça um novo deploy.

## 2. Tabela e policies no Supabase

No Supabase, abra `SQL Editor` e rode o conteúdo do arquivo:

```txt
supabase/cojur_state_setup.sql
```

Ele cria a tabela `public.cojur_state` e libera leitura/gravação apenas para o próprio usuário autenticado.

## 3. Criar usuário

No Supabase, vá em:

```txt
Authentication > Users > Add user
```

Crie um e-mail e senha para acessar o COJUR Nexus.

## 4. Teste

1. Abra o app em um navegador.
2. Faça login.
3. Crie ou altere um dado.
4. Verifique no Supabase se a tabela `cojur_state` recebeu uma linha.
5. Abra outro navegador.
6. Faça login com o mesmo e-mail e senha.
7. O dado deve aparecer.

## Observação

A sincronização só funciona entre navegadores quando o mesmo usuário faz login nos dois. Sem login, cada navegador permanece isolado.
