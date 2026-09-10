# X Article Publisher

A free, open-source [agent skill](https://code.claude.com/docs/en/skills) — compatible with Claude Code, ChatGPT Skills, and OpenAI Codex — that drafts a long-form X (Twitter) Article and a short teaser post in your voice, designs a matching branded cover image, and publishes both to X.com — with a mandatory review step before anything goes live.

Built by [Smart Maya](https://smartmaya.ai).

## Who this is for

Founders, consultants, and teams who write thought-leadership content and want the whole publish-to-X pipeline — drafting, cover art, and the composer's fiddly steps — handled by asking their AI assistant in plain language, without hiring a designer or manually wrestling with X's Article editor.

## Why it matters

- **No new tool to learn.** It runs inside the AI assistant you already use, driving the same browser you already use — no separate dashboard, login, or install beyond the skill itself.
- **No subscription.** MIT-licensed and free to use or adapt.
- **Nothing goes live without sign-off.** The exact final text and cover image are shown to you before publishing, every time — not just the first time.
- **A cover image that isn't a stock photo.** A small, parameterized HTML/CSS template renders a branded graphic — a headline card, a labeled step-flow diagram, or a small illustrated hero/villain scene — sized exactly to X's Article cover ratio.

## Use cases

- **Thought-leadership publishing** — turn a rough draft or a stream-of-consciousness voice memo into a polished Article with real visual design and, where the material has a real arc, real narrative structure.
- **Cross-posting** — adapt an existing LinkedIn Article (or any long-form piece) into an X Article without starting from a blank page.
- **Framework/process posts** — the `flow` cover style is built for posts centered on a named N-step idea (e.g. "Author → Executor → Supervisor").
- **Incident write-ups and lessons learned** — the `scene` cover style and the storytelling guidance in `SKILL.md` are built for posts with a real hero (the discipline that fixed something) and villain (the actual root cause).
- **Consistent branding** — a one-time brand-profile setup keeps voice, accent color, and handle consistent across every post without re-specifying them.

## Methodology

This treats publishing the way good automation always should — as three distinct roles, not one big undifferentiated action:

1. **Author** drafts the Article body and the teaser post, in your voice (learned from a short, optional setup interview, or supplied fresh each time) — defaulting to a hero/villain narrative structure when the source material genuinely has one.
2. **Executor** renders the cover image from a small JSON config via headless Chromium (`scripts/generate_cover.js`), then drives X's Article composer via browser automation.
3. **Supervisor** — you. The skill always stops and shows you the literal final text and image before publishing. This step cannot be skipped by asking for "automatic" posting; automatic applies to the drafting and design, not to the publish click.

## Scope & limitations

- Requires a browser automation connection (for example, Claude in Chrome, or an equivalent Codex/ChatGPT browser tool) and an X.com session you're already logged into — this skill never handles your X credentials.
- X Articles cannot be edited in place once published; a correction requires unpublishing to drafts, editing, and republishing (documented in `SKILL.md`).
- The cover image generator produces clean, readable graphic-design covers (headline cards, step-flow diagrams, or a small illustrated scene) — it does not generate photorealistic images.
- Designed for one post at a time with a human review in the loop; not intended for unattended, scheduled bulk posting.

## Platform support

| Folder | Platform |
|---|---|
| `claude-x-article-publisher/` | Claude Code / Claude-compatible Agent Skills |
| `chatgpt-x-article-publisher/` | ChatGPT Skills, and OpenAI Codex (Codex uses the same open `SKILL.md` standard OpenAI adopted for ChatGPT Skills — no separate Codex build is needed) |

## Install

**Claude Code** — add the [Smart Maya Skills marketplace](https://github.com/WiselyWise/smartmaya-skills):

```text
/plugin marketplace add WiselyWise/smartmaya-skills
```

Then install this skill:

```text
/plugin install smartmaya-x-article-publisher@smartmaya-skills
```

**ChatGPT** — import or create the skill through the Skills area of the relevant workspace, using the `chatgpt-x-article-publisher` folder.

**OpenAI Codex** — place `chatgpt-x-article-publisher/SKILL.md` (and its `scripts/`/`templates/` folders) in your Codex skills directory (`~/.agents/skills/`). It uses the same `SKILL.md` format Codex reads natively.

**Prerequisites (all platforms):**
- Browser automation enabled in your session (Claude in Chrome, or an equivalent Codex/ChatGPT browser tool).
- Node.js with `playwright` installed, and a Chromium binary available, for the cover-image renderer (`scripts/generate_cover.js`). Most agent environments that include a pre-installed browser already satisfy this.
- Already logged into X.com in the automated browser.

## Use

Ask your assistant naturally: *"Turn this into an X Article with a cover image and post it."* It will (optionally) ask a few one-time branding questions, draft the Article and teaser post, render a cover image, show you everything, and only publish after you say go.

The cover-image renderer can also be run standalone:

```bash
node scripts/generate_cover.js --config scripts/example.cover.config.json --out cover.png
```

See `SKILL.md` for the full workflow, the config shape for all three cover styles (`title`, `flow`, and `scene`), and the X.com composer quirks an agent should know about.

## Safety & compliance

- Nothing is published until the exact final text and image have been shown to you and you've given explicit, fresh approval — every time, not just the first post.
- Credentials are never entered by the skill; it only ever acts inside a browser session you're already logged into.
- CAPTCHAs and login flows are never bypassed — the skill stops and asks if it hits one.

## License

MIT — see [LICENSE](LICENSE). Contributions welcome.
