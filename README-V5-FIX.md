# TheoGrace XMAS Experience v5 — timing fix

This version is based directly on the Vercel ZIP supplied by the user.

## Exact bug found

`public/late.m4a` is approximately **55.1 seconds** long.

The previous timeline expected the Nicky scene at **55–64 sec** and the final scene at **64–74 sec**.
The audio therefore ended before those scenes could run normally.

## Fix

The 8 scenes are now calibrated inside the real 55.1 sec track:

1. 0–6.5 sec
2. 6.5–13 sec
3. 13–20 sec
4. 20–27 sec
5. 27–34 sec
6. 34–41 sec
7. **41–49 sec — Nicky holiday note**
8. **49–55.1 sec — final TheoGrace scene**

No Supabase changes are required.
No Vercel environment variable changes are required.
Use the same existing gift URLs.
