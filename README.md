# TheoGrace XMAS Supabase + Vercel Demo

This project demonstrates the architecture:

Supabase table -> one Next.js dynamic page -> thousands of unique gift URLs.

## 1. Create a Supabase project

Open the SQL Editor and run:

`supabase/schema-and-demo-data.sql`

This creates the `xmas_gifts` table and inserts 5 fictional demo orders.

## 2. Get Supabase credentials

In Supabase, copy:

- Project URL
- Service Role Key

Never expose the Service Role Key in browser-side code.

## 3. Local test

Copy `.env.example` to `.env.local` and add your real values.

Then:

```bash
npm install
npm run dev
```

Open:

- http://localhost:3000/gift/tg-x7k2p9fa
- http://localhost:3000/gift/tg-r4m8q2lc
- http://localhost:3000/gift/tg-b6n3v8kd
- http://localhost:3000/gift/tg-h2w7c5mz
- http://localhost:3000/gift/tg-p9f3j6rt

## 4. Deploy to GitHub + Vercel

Push this one project to GitHub.

Import the repository in Vercel.

Add these Environment Variables in Vercel:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Deploy.

If your deployed domain is:

`https://theograce-xmas.vercel.app`

the five demo links become:

- `/gift/tg-x7k2p9fa`
- `/gift/tg-r4m8q2lc`
- `/gift/tg-b6n3v8kd`
- `/gift/tg-h2w7c5mz`
- `/gift/tg-p9f3j6rt`

## Scaling to 10,000 customers

You do NOT create 10,000 files in GitHub.

You import 10,000 rows into the same Supabase table.

The same `/gift/[token]` page handles every order.

The URLs are dynamic.

## Security

Use random `public_token` values rather than sequential order numbers in public links.

Keep the Supabase service-role key server-side only.

For production, tokens should be cryptographically random and long enough to resist guessing.
