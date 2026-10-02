# TheoGrace XMAS Experience v4

This is a separate version. Keep v2 and v3 as previous working versions.

## What v4 fixes

v3 had the working experience, official TheoGrace logo, song and the supplied Nicky photo,
but the cinematic visual direction shown in the storyboard was not actually included as
production assets.

v4 adds those visual layers to the live experience:

- official `public/theograce-logo.svg`
- supplied `public/nicky.jpg`
- embedded song `public/late.m4a`
- deep TheoGrace blue / gold visual system
- cinematic gift background for the opening/story
- glowing gift-box visual scene
- NYC Christmas atmosphere for the closing scene
- stronger Nicky holiday-note treatment
- the storyboard saved as `public/storyboard-reference.png` for design reference

The three background images are packaged in the repo:

- `public/scene-gift.jpg`
- `public/scene-magic.jpg`
- `public/scene-nyc.jpg`

## Deploy

Replace the current project files with the contents of this ZIP and commit to GitHub.
Vercel will redeploy automatically.

No Supabase schema or environment-variable changes are required.

Use the same test URL:

`/gift/tg-x7k2p9fa`

## Versioning recommendation

Before deploying v4, create a Git tag or branch named `v3` so the current working version
is always recoverable.
