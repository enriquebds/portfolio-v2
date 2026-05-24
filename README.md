# Portfólio v2 — Enrique Barbosa

Portfólio pessoal construído com **Next.js 15**, **Payload CMS 3** e **PostgreSQL**. Design "Terminal meets Editorial".

## Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3
- **Database**: PostgreSQL (via Railway)
- **Styling**: Tailwind CSS v4 + CSS Variables
- **Animations**: Framer Motion
- **Deploy**: Railway

## Setup local

```bash
npm install
cp .env.example .env.local  # configure suas vars
npx payload migrate
npx payload run src/seed/index.ts
npm run dev
```

Acesse `http://localhost:3000` — Admin em `/admin`.

## Deploy

Veja [RAILWAY_DEPLOY.md](./RAILWAY_DEPLOY.md) para instruções completas.
