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

## Reporting abuse or impersonation

If you find a modified, forked, or redistributed copy of this skill using the "Smart Maya" or "WiselyWise" name, marks, or branding without permission, or a copy you believe is malicious, report it to **security@wiselywise.com** with the location (repository URL, marketplace listing, or platform) and what you observed. See [README.md](README.md) for what the license does and does not cover for modified copies.

## Scope

X Article Publisher drafts Article and teaser-post copy, and renders a cover image locally via headless Chromium — no network calls beyond the X.com pages the browser automation actually visits. It never stores, requests, receives, or transmits X credentials, session cookies, or tokens: publishing works only inside a browser session the owner has already signed into, using whatever browser automation access the host agent environment provides (for example, Claude in Chrome). Granting that access is equivalent to granting a human assistant access to that logged-in browser tab, and should be treated with the same care.

The skill has no X API integration or credential handling of any kind. It also never bypasses a CAPTCHA or completes a login flow — if the browser isn't already authenticated, it stops and asks. Nothing is scheduled or published without the owner reviewing the exact final text and image and giving explicit, fresh approval for that specific post.

Because the skill publishes under whatever identity the logged-in browser session is authenticated as, it also checks — before the pre-publish approval step — whether that identity is a brand/company handle or any account other than the user's own personal profile, and asks for an explicit acknowledgement that the user is authorized to publish on that organization's behalf. This is a separate check from content approval above: it addresses authorization to act as the account, not whether the draft is good.

This skill interacts with X's own web interface via browser automation, standing in for manual clicks the user would otherwise make themselves. X may apply its own automation or bot-activity policies to this kind of use, independent of anything this skill does; the user's account is subject to whatever action X takes under its own terms. WiselyWise is not responsible for X account actions, restrictions, or suspensions that result from using this skill.

This skill makes no network calls to WiselyWise infrastructure. It runs entirely inside the host agent environment's own session; no content the user provides or the skill drafts is sent to, logged by, or retained by WiselyWise.

The user is responsible for reviewing drafted content — Article text, teaser-post text, and the generated cover image — for accuracy, and for third-party intellectual property, trademark, defamation, and confidentiality concerns before approving publication. This skill drafts from what the user provides; it does not verify legal clearance of names, quotes, logos, or claims about third parties.
