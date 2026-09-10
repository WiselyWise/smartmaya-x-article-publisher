# Changelog

All notable changes to X Article Publisher are documented here.

## [1.1.0] - 2026-09-10

### Added

- ChatGPT / OpenAI Codex-compatible `SKILL.md` (`chatgpt-x-article-publisher/`) — same open `SKILL.md` standard as the Claude variant, works in both without modification.
- A third cover-image style, `"scene"` — renders a small illustrated scene (a skyline for "the systems," a rising crack for the risk, a glowing shield for the safeguard) instead of plain text on a background, for posts built around a hero/villain or before/after narrative. Config shape and both preset colors are documented in `scripts/generate_cover.js`'s header comment.
- `SKILL.md` guidance on defaulting to storytelling (naming an explicit hero and villain, structuring the piece as narrative "beats") when the source material has a real arc, rather than a flat list of what was done.

### Changed

- Restructured into platform folders (`claude-x-article-publisher/`, `chatgpt-x-article-publisher/`) matching the marketplace distribution pattern used by other Smart Maya skills.
- README now documents both platforms and the three cover styles.

## [1.0.0] - 2026-08-23

### Added

- Initial release of the X Article Publisher skill: brand-profile setup, Article + teaser post drafting, `title`/`flow` cover-image generation, X.com composer automation, and a mandatory owner-review gate before publishing.
