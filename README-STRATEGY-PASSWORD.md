# Protecting /xmas-strategy

The strategy route and its confidential screenshots are password protected server-side.

## Vercel setup
1. Vercel project -> Settings -> Environment Variables
2. Add `STRATEGY_PASSWORD`
3. Set a strong password (do NOT put the real password in GitHub)
4. Apply it to Production (and Preview if you want previews protected)
5. Redeploy

Visit `/xmas-strategy`. Unauthenticated visitors are redirected to `/xmas-strategy-login`.

The session cookie is HttpOnly, SameSite=Strict and expires after 8 hours.
The confidential strategy screenshots were moved out of `/public` and are served only through an authenticated API endpoint.

This protects the strategy presentation from casual/public access. For highly sensitive corporate material, use company SSO / Vercel deployment protection rather than a shared password.
