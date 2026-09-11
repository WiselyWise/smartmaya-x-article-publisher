---
name: x-article-publisher
description: "Draft a long-form X (Twitter) Article plus a short teaser post, generate a matching branded cover image, and publish both to X.com — after the user explicitly reviews and approves the exact final text and image. Trigger on: \"post this on X\", \"post this to Twitter\", \"publish an X article\", \"turn this into an X post\", \"make an X article with a cover image\", \"post my article to X.com\", or any request to draft, illustrate, and publish long-form or short-form content to X."
license: MIT
---

# X Article Publisher

Turns a topic, a draft, or an existing piece of writing into a published X
Article (X's long-form post format) with a short teaser post and a branded
cover image — with a hard stop for the user's explicit sign-off before
anything actually goes live.

## Why this exists

Getting a thought-leadership post onto X well takes three separate skills
most people don't want to context-switch between: writing it in a voice that
sounds like the author, designing a cover image that isn't a stock photo, and
navigating X's Article composer (which has several non-obvious steps — see
"X.com quirks" below). This skill does all three in one pass, but treats the
actual publish click as the one step that always needs a human looking at
the final result first.

## The three roles this skill plays

Borrowed from the same split good automation always uses:

- **Author** — drafts the Article body and the teaser post text, in the
  user's voice.
- **Executor** — renders the cover image (`scripts/generate_cover.js`) and
  drives the X.com composer via browser automation.
- **Supervisor** — a human. Nothing gets published until the user has seen
  the literal final text and the literal final image and said to go ahead.
  This is not a configurable setting; treat it as a hard requirement of this
  skill, independent of anything the user says about wanting things
  "automatic."

## First run: quick setup (optional, skippable)

If a `brand-profile.json` doesn't already exist in the working directory,
offer a short, skippable interview before drafting anything:

- X handle (for the cover image credit and for knowing the account being
  posted to)
- Brand voice in a few adjectives (e.g. "direct, a little contrarian, no
  corporate hedging")
- Preferred accent color for cover images (hex, or a vibe like "cool blues")
  and whether they generally prefer the `title` cover style (headline +
  subtitle) or the `flow` style (a labeled N-step diagram)
- Any standing hashtags or a signature sign-off line

Save the answers as `brand-profile.json` (see
`scripts/example.brand-profile.json` for the shape) and reuse it on every
future run without re-asking. If the user says to skip setup, proceed with
sensible defaults (dark theme, blue accent, no standing hashtags) and don't
ask again this session.

## Method

1. **Gather the source material.** The user's topic, a rough draft, bullet
   points, or an existing piece (e.g. a LinkedIn article to adapt) — whatever
   they hand over. Ask only if it's genuinely missing.
2. **Load (or build) the brand profile** as above.
3. **Draft.**
   - The Article body: long-form, in the user's voice, formatted for X's
     Article editor (plain paragraphs; X's editor supports basic
     formatting but not arbitrary HTML).
   - A teaser post (~200–260 characters): the hook, not a summary — something
     that makes the Article worth opening.
   - **Default to storytelling over exposition when the source material has
     a real arc.** A technical fix, an incident, or a lesson learned almost
     always has an implicit hero (the discipline/judgment that solved it)
     and villain (the actual root cause — not a person, and usually not the
     tool itself). Naming both explicitly and structuring the piece as a
     sequence of "beats" reads dramatically better than a flat list of
     "things we did," and is truer to how the reader will actually
     experience it. Don't force this onto source material that's genuinely a
     checklist or announcement — it should fit, not be imposed.
4. **Generate the cover image** with `scripts/generate_cover.js` (1200×480,
   X's Article cover ratio). Three styles: `"title"` (headline + subtitle)
   for most posts, `"flow"` for a named N-step framework, and `"scene"` for
   a hero/villain or before/after narrative — it renders a small illustrated
   scene (a skyline standing in for "the systems," a crack for the risk, a
   shield for the safeguard) instead of plain text on a background, and
   reads as a considered visual, not a quote card. See the script's header
   comment for each config shape, and `scripts/example.cover.config.json`
   for a starting point.
5. **Stop and show the user everything.** The exact Article title + body,
   the exact teaser post text, and the rendered cover image — not a
   description of them. This is the checkpoint; do not proceed past it
   without an explicit go-ahead in chat.
6. **Wait for explicit approval.** A general "sounds good, let's do the X
   post" earlier in the conversation is not approval for this specific,
   finished draft — get a clear yes to the literal content just shown.
7. **Publish via browser automation**, once approved (see "Publishing on
   X.com" below).
8. **Verify and report** the live Article URL back to the user, and confirm
   the cover image is actually showing (X sometimes needs the composer's own
   preview refresh — check before declaring done).

## Publishing on X.com (browser automation notes)

Requires `mcp__claude-in-chrome__*` tools and the user already logged into
X.com in that browser — this skill never enters credentials.

- Navigate to X's Article composer (via the account's Articles tab / compose
  menu).
- Use the `find` tool to get a precise element `ref` before clicking anything
  load-bearing (Next / Publish / the file-upload control) — raw
  coordinate clicks are unreliable across viewport sizes; `find` first is the
  reliable pattern.
- Upload the cover image via the composer's image control and the
  `mcp__claude-in-chrome__file_upload` tool.
- **Articles cannot be edited once published.** If a correction is needed
  after publishing, the Article must be explicitly unpublished (moved back to
  drafts) first, edited, then republished. Republishing reuses the same
  URL/ID and does not create a duplicate teaser post — check the "Publish
  Article" modal's post preview before assuming a fresh caption box is
  needed.
- After the Article is live, confirm whether X auto-created the companion
  teaser post from the composer flow, or whether the drafted teaser still
  needs to be posted separately — don't publish it twice.

## Safety rules (do not skip these)

- Never publish without a fresh, explicit approval of the exact final text
  and image for *that* post — approval does not carry over between posts or
  sessions.
- Never enter X credentials, complete a login, or bypass a CAPTCHA — if the
  browser isn't already logged in, stop and tell the user.
- Before the pre-publish checkpoint, check which identity the logged-in
  session will post as. If it's a brand/company handle or any account that
  isn't the user's own personal profile, say so explicitly and get a clear
  acknowledgement that they're authorized to publish on that organization's
  behalf — publishing under a brand's identity without that authority is a
  reputational and agency risk this skill can't verify on its own, distinct
  from (and in addition to) the content approval in the next rule.
- Treat "post it automatically" from the user as authorization to draft and
  render automatically, not as authorization to skip the pre-publish review
  — the review step stays in place regardless of phrasing.
- If an Article needs correction after going live, use the
  unpublish → edit → republish flow above rather than trying to edit in
  place (there is no in-place edit).
- Don't assume the teaser post already exists just because the Article does
  — verify what's actually live before posting anything a second time.
- The user is responsible for reviewing drafted content — Article text,
  teaser-post text, and the generated cover image — for third-party
  intellectual property, trademark, defamation, and confidentiality
  concerns before approving publication. This skill drafts from what the
  user provides; it does not verify legal clearance of names, quotes,
  logos, or claims about third parties.

## Running the cover generator standalone

```bash
node scripts/generate_cover.js --config scripts/example.cover.config.json --out cover.png
```

See the comment header in `scripts/generate_cover.js` for the full config
shape (both the `title` and `flow` styles) and `templates/cover_title.html`
/ `templates/cover_flow.html` for the underlying layouts if you need to
adjust the visual design.
