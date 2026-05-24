# Deploy no Railway

## 1. Criar projeto no Railway

1. Acesse [railway.app](https://railway.app) e faça login
2. Clique em **New Project**

## 2. Adicionar PostgreSQL

1. **Add Service → Database → PostgreSQL**
2. Copie a `DATABASE_URL` em **Variables**

## 3. Adicionar serviço Next.js

1. **Add Service → GitHub Repo** → `enriquebds/portfolio-v2`
2. Railway detecta Next.js e configura o build automaticamente

## 4. Configurar variáveis de ambiente

```
DATABASE_URL=<connection string do PostgreSQL Railway>
PAYLOAD_SECRET=<string aleatória segura 32+ chars>
NEXT_PUBLIC_SERVER_URL=<url gerada pelo Railway>
```

## 5. Rodar migrações e seed

```bash
npx payload migrate
npx payload run src/seed/index.ts
```

## 6. Domínio customizado (Cloudflare)

1. Railway: **Settings → Domains → Add Custom Domain** → copie o CNAME
2. Cloudflare: DNS → Add CNAME record → Proxy: **DNS only**
3. SSL provisionado automaticamente pelo Railway

## Admin

Após o deploy, acesse `/admin` para criar o usuário administrador.
