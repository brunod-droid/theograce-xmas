# TheoGrace XMAS Experience v3

This is a separate version from v2. It keeps the same Supabase/Vercel architecture and the same `/gift/[token]` URLs.

## What's new in v3

- Official TheoGrace SVG logo (`public/theograce-logo.svg`)
- Deep TheoGrace blue cinematic visual direction
- User-provided portrait (`public/nicky.jpg`)
- User-provided song (`public/late.m4a`)
- One-tap start, then automatic scenes synced to the song
- Story-style progress bars at the top
- Tap anywhere to pause / resume
- Personalized clues and reveal from Supabase
- Replay button at the end
- A handwritten-style holiday note scene

## Important note about the Nicky message

The handwritten-style copy in `GiftExperience.js` is placeholder creative copy for the prototype. It should be approved/replaced with the exact authorized wording before production use.

## Deploy

Replace the code in your existing TheoGrace repo with this v3 folder, commit, and push. Vercel should redeploy automatically.

You do NOT need to change the existing Supabase table or your environment variables.

Test with the same demo URL, for example:

`/gift/tg-x7k2p9fa`
