# GyanMatrix

GyanMatrix is a future hybrid AI + Human Mentorship platform providing personalized career and learning guidance by combining learner data, real CS career trajectories, AI intelligence, and human mentorship.

## Current Scope (Phase 0)

This repository currently contains the technical foundation for Phase 0.
The goal of this phase is ONLY to establish a clean, scalable, production-ready Next.js project. No UI, ML models, or complex schemas have been implemented yet.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Deployment**: Vercel

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Copy the example environment file and fill in your credentials.
   ```bash
   cp .env.example .env.local
   ```
   **Important**: Never commit `.env.local` or expose `DATABASE_URL` to client-side code.

3. Database Setup:
   Provide your Neon PostgreSQL connection string in `.env.local`:
   `DATABASE_URL="postgres://..."`

## Development Commands

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run db:test`: Test the database connection
