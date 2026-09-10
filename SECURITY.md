# Security Policy

## Supported versions

Security fixes are applied to the latest release on the default branch.

## Reporting a vulnerability

Please do not open a public issue for a suspected security vulnerability. Email **security@wiselywise.com** with:

- a clear description of the issue
- steps to reproduce it
- the affected version or commit
- any suggested mitigation

We will acknowledge reports within 5 business days and work with you on a coordinated disclosure.

## Scope

X Article Publisher drafts Article and teaser-post copy, and renders a cover image locally via headless Chromium — no network calls beyond the X.com pages the browser automation actually visits. It never stores, requests, receives, or transmits X credentials, session cookies, or tokens: publishing works only inside a browser session the owner has already signed into, using whatever browser automation access the host agent environment provides (for example, Claude in Chrome). Granting that access is equivalent to granting a human assistant access to that logged-in browser tab, and should be treated with the same care.

The skill has no X API integration or credential handling of any kind. It also never bypasses a CAPTCHA or completes a login flow — if the browser isn't already authenticated, it stops and asks. Nothing is scheduled or published without the owner reviewing the exact final text and image and giving explicit, fresh approval for that specific post.
