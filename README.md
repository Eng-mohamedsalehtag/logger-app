# Observify — Logging & Monitoring Dashboard

A production-ready, dark-mode SaaS dashboard UI for a logging and monitoring platform. Built with React, Vite, TypeScript, Tailwind CSS, Express, and MongoDB.

## Features

- **Authentication** — Register/login with JWT httpOnly cookies
- **Dashboard** — Stats, API key card, applications grid with search, create, and delete
- **Application details** — Paginated logs table with filters and analytics charts (pie + line)
- **Log ingestion** — POST logs via `x-api-key` header from external services

## Quick start

### 1. Backend (requires MongoDB)

```bash
cd backend
# Create .env with: PORT, MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV
npm install
npm run dev   # or: node server.js
```

### 2. Frontend

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Register a new account or sign in.

The dev server proxies `/api` → `http://localhost:3000`.

## Environment

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_USE_MOCK` | `false` | Use in-memory mock data (no backend) |
| `VITE_API_URL` | `/api` | API base URL (proxied in dev) |

Set `VITE_USE_MOCK=true` to run the UI without a backend (any email/password works).

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- React Router
- Recharts
- Express 5 + Mongoose + MongoDB
