#!/usr/bin/env node
/**
 * generate_cover.js — render a branded cover image for an X Article (or any
 * post) from a small JSON config, using headless Chromium via Playwright.
 *
 * Usage:
 *   node scripts/generate_cover.js --config cover.config.json [--out cover.png]
 *
 * Config shape (title style, the default — good for most posts):
 * {
 *   "style": "title",
 *   "platform": "x",              // "x" -> 1200x480, "linkedin" -> 1200x630
 *   "kicker": "THOUGHT LEADERSHIP",
 *   "title": "Should I De-AI This?",
 *   "subtitle": "A simple framework for when to strip the AI polish back out.",
 *   "accent": "#8ab4ff",
 *   "brand": "@yourhandle"
 * }
 *
 * Config shape (flow style — a labeled N-step diagram, e.g. a 3-stage framework):
 * {
 *   "style": "flow",
 *   "platform": "x",
 *   "heading": "Author -> Executor -> Supervisor",
 *   "nodes": [
 *     { "icon": "✍️", "label": "Author", "sublabel": "Writes the logic once", "color": "#8ab4ff" },
 *     { "icon": "⚙️", "label": "Executor", "sublabel": "Runs it, repeatedly", "color": "#7ee3c0" },
 *     { "icon": "👁", "label": "Supervisor", "sublabel": "Watches what can't be undone", "color": "#f2b880" }
 *   ]
 * }
 *
 * Config shape (scene style — a small illustrated scene instead of a plain
 * text card; use when the post has a hero/villain or before/after narrative
 * arc worth depicting rather than just stating):
 * {
 *   "style": "scene",
 *   "platform": "linkedin",
 *   "kicker": "A STORY FROM 2026",
 *   "title": "The villain in this story wasn't the AI.",
 *   "subtitle": "It was unsupervised speed. The hero was judgment.",
 *   "accent": "#a78bfa",
 *   "accentSecondary": "#38bdf8",
 *   "dangerColor": "#f87171",
 *   "brand": "Smart Maya AI",
 *   "brandTag": "Chandra Kumar, Founder"
 * }
 * Renders a night skyline (the systems), a red crack rising through it from
 * the left (the villain/risk), and a glowing shield on the right (the
 * hero/safeguard). Set "hideShield": true or "hideCrack": true to drop
 * either element for a pure-narrative or pure-risk framing.
 *
 * Either config may set explicit "width" / "height" / "out" to override the
 * platform default. Requires: npm install playwright (already vendored by
 * this skill's parent environment when run inside a Claude session that has
 * Playwright + a Chromium binary available).
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }
  return args;
}

const PLATFORM_SIZES = {
  x: { width: 1200, height: 480 },
  linkedin: { width: 1200, height: 630 },
};

(async () => {
  const args = parseArgs(process.argv.slice(2));
  if (!args.config) {
    console.error('Usage: node generate_cover.js --config cover.config.json [--out cover.png]');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(path.resolve(args.config), 'utf8'));
  const style = config.style === 'flow' ? 'flow' : config.style === 'scene' ? 'scene' : 'title';
  const templateFile = style === 'flow' ? 'cover_flow.html' : style === 'scene' ? 'cover_scene.html' : 'cover_title.html';
  const templatePath = path.resolve(__dirname, '..', 'templates', templateFile);

  const size = PLATFORM_SIZES[config.platform] || PLATFORM_SIZES.x;
  const width = config.width || size.width;
  const height = config.height || size.height;
  const out = path.resolve(args.out || config.out || `cover_${config.platform || 'x'}_${width}x${height}.png`);

  let html = fs.readFileSync(templatePath, 'utf8');
  html = html.replace('/*__CONFIG__*/{}', JSON.stringify(config));

  const tmpHtml = path.resolve(__dirname, `_tmp_cover_${Date.now()}.html`);
  fs.writeFileSync(tmpHtml, html);

  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || '/opt/pw-browsers/chromium';
  const launchOpts = fs.existsSync(executablePath) ? { executablePath } : {};
  const browser = await chromium.launch(launchOpts);

  try {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
    await page.goto('file://' + tmpHtml);
    await page.waitForTimeout(150);
    await page.screenshot({ path: out });
    console.log(`Wrote ${out} (${width}x${height} @2x)`);
  } finally {
    await browser.close();
    fs.unlinkSync(tmpHtml);
  }
})();
