# Observify — Logging & Monitoring Dashboard

A full-stack logging and monitoring platform with a modern SaaS-style dashboard.

This repository includes:

- A **frontend** built with React, Vite, TypeScript, Tailwind CSS, and Recharts
- A **backend API** using Express, Mongoose, MongoDB, and JWT auth
- A **developer SDK** for external log ingestion via `x-api-key`

## Project Overview

Observify helps developers track application logs, manage API keys, and view analytics in a single dashboard.

Key capabilities:

- Secure **user authentication** and account management
- **Application management** with search, create, and delete workflows
- **Log listing** with filters, pagination, and real-time analytics charts
- **API key-based ingestion** for external services to submit logs

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

| Variable        | Default | Description                          |
| --------------- | ------- | ------------------------------------ |
| `VITE_USE_MOCK` | `false` | Use in-memory mock data (no backend) |
| `VITE_API_URL`  | `/api`  | API base URL (proxied in dev)        |

Set `VITE_USE_MOCK=true` to run the UI without a backend (any email/password works).

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build

## Deploy to Vercel

1. Push the repo to GitHub and import it in [Vercel](https://vercel.com).
2. Add **Environment Variables** (see `.env.example`):
   - `MONGO_URI` — MongoDB Atlas connection string (allow `0.0.0.0/0` in Atlas Network Access)
   - `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV=production`
   - `FRONTEND_URL` — your Vercel URL, e.g. `https://your-app.vercel.app`
   - `VITE_USE_MOCK=false`, `VITE_API_URL=/api`
3. Deploy. The frontend is static; `/api/*` runs as a serverless function (`api/index.js`).

```bash
# Optional: deploy from CLI
npm i -g vercel
vercel
```

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- React Router
- Recharts
- Express 5 + Mongoose + MongoDB

## Screenshot

![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(354).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot (355).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(356).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(357).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(358).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(359).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(362).png>)
![Observify Dashboard Screenshot](<./screanshots/Screenshot%20(363).png>)
