# JT Collections - Production E-Commerce

Full-stack e-commerce platform with React frontend, Express backend, and Supabase database/auth.

## Project Structure

```
JT Colection/
├── frontend/   # React + Vite + TypeScript app
├── backend/    # Express + TypeScript API
├── database/   # SQL schema and migrations
├── supabase/   # Supabase configs and migrations
└── package.json
```

## Tech Stack
- Frontend: React, Vite, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, TypeScript
- Database/Auth: Supabase (PostgreSQL + Auth)

## Local Development

```bash
# install root helper dependencies
npm install

# run frontend + backend together
npm run dev

# production builds
npm run build
```

## Deployment

- Hostinger Cloud Startup (recommended): see `HOSTINGER_CLOUDSTARTUP_DEPLOY.md`
- Backend build output: `backend/dist`
- Frontend build output: `frontend/dist`

## Notes

- Production secrets should be added in hosting platform environment variables.
- Do not commit real secret values in `.env` files.
