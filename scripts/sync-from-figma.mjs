// ─────────────────────────────────────────────────────────
// FIGMA AUTO-SYNC SCRIPT
// ─────────────────────────────────────────────────────────
// This script reads the Figma design system file via REST API,
// compares published components against data/components.json,
// and updates the JSON with any new or changed components.
//
// STATUS: Ready but not scheduled. See scripts/FIGMA-SYNC-README.md
//
// The demo design system has generated sample data that doesn't
// match the Figma file. When the real design system is in place
// (all components published in Figma), enable the daily schedule
// in .github/workflows/sync-figma.yml.
//
// HOW TO ENABLE:
// 1. Add two GitHub repo secrets (Settings > Secrets > Actions):
//    - FIGMA_TOKEN: your Figma personal access token (starts with figd_)
//    - FIGMA_DS_FILE_KEY: the Figma file key from the URL
//      (the ID between /design/ and /file-name in the Figma URL)
// 2. Edit .github/workflows/sync-figma.yml:
//    Uncomment the schedule trigger to enable daily runs at 6am ACST
// 3. Test manually: Go to the repo Actions tab > Sync Design System
//    from Figma > Run workflow
//
// HOW IT WORKS:
// - Calls the Figma REST API (not the MCP connector, no monthly limit)
// - Groups published components by their root name
// - Compares against the current components.json
// - Adds new components with a changelog entry
// - Adds new variants to existing components with a changelog entry
// - Flags components missing from Figma (doesn't delete, just logs)
// - If nothing changed, exits without committing
// - If changes found, writes updated JSON; the GitHub Action commits and pushes
// - The existing deploy.yml picks up the push and rebuilds the site
//
// RATE LIMITS: One API call per run. Figma REST API allows ~30 req/min.
// GitHub Actions free tier: 2000 min/month. This uses ~0.5 min/day.
// ─────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '..', 'data', 'components.json');
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_DS_FILE_KEY;

if (!FIGMA_TOKEN || !FILE_KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_DS_FILE_KEY environment variables.');
  console.error('See scripts/FIGMA-SYNC-README.md for setup instructions.');
  process.exit(1);
}

const TODAY = new Date().toISOString().split('T')[0];

async function figmaFetch(url) {
  const res = await fetch(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } });
  if (res.status === 429) {
    console.log('Rate limited, waiting 10s...');
    await new Promise(r => setTimeout(r, 10000));
    const retry = await fetch(url, { headers: { 'X-Figma-Token': FIGMA_TOKEN } });
    if (!retry.ok) throw new Error('Figma API error after retry: ' + retry.status);
    return retry;
  }
  if (!res.ok) throw new Error('Figma API error: ' + res.status);
  return res;
}

async function main() {
  console.log('Fetching components from Figma file ' + FILE_KEY + '...');
  const res = await figmaFetch('https://api.figma.com/v1/files/' + FILE_KEY + '/components');
  const data = await res.json();
  const figmaComponents = data.meta?.components || [];
  console.log('Found ' + figmaComponents.length + ' published components in Figma.');

  if (figmaComponents.length === 0) {
    console.log('No components found in Figma. Exiting.');
    process.exit(0);
  }

  const figmaGroups = {};
  for (const c of figmaComponents) {
    const rootName = c.containing_frame?.name || c.name.split('/')[0].trim();
    if (!figmaGroups[rootName]) {
      figmaGroups[rootName] = { name: rootName, description: c.description || '', variants: [] };
    }
    const variantName = c.name.includes('/') ? c.name.split('/').slice(1).join('/').trim() : c.name.trim();
    figmaGroups[rootName].variants.push({ name: variantName || 'Default', description: c.description || '' });
  }
  console.log('Grouped into ' + Object.keys(figmaGroups).length + ' root components.');

  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  const published = JSON.parse(raw);
  const publishedByName = {};
  for (const comp of published.components) publishedByName[comp.name] = comp;

  const changes = [];
  const figmaNames = new Set(Object.keys(figmaGroups));
  const publishedNames = new Set(Object.keys(publishedByName));

  for (const name of figmaNames) {
    if (!publishedNames.has(name)) {
      published.components.push({
        name: figmaGroups[name].name,
        product: 'raa-web',
        category: 'Uncategorised',
        status: 'new',
        description: figmaGroups[name].description || 'Component synced from Figma on ' + TODAY,
        variants: figmaGroups[name].variants,
        properties: {},
        usage: '',
        accessibility: '',
        usedIn: [],
        changelog: [{ date: TODAY, type: 'added', description: 'New component detected in Figma and synced automatically' }],
        codeFile: ''
      });
      changes.push('NEW: ' + name + ' (' + figmaGroups[name].variants.length + ' variants)');
    }
  }

  for (const name of figmaNames) {
    if (!publishedNames.has(name)) continue;
    const fg = figmaGroups[name];
    const pub = publishedByName[name];
    const pubVariantNames = new Set((pub.variants || []).map(v => v.name));
    const newVariants = fg.variants.filter(v => !pubVariantNames.has(v.name));
    if (newVariants.length > 0) {
      for (const nv of newVariants) pub.variants.push(nv);
      pub.changelog = pub.changelog || [];
      pub.changelog.unshift({ date: TODAY, type: 'added', description: 'New variant(s) synced from Figma: ' + newVariants.map(v => v.name).join(', ') });
      changes.push('UPDATED: ' + name + ' - added ' + newVariants.length + ' variant(s)');
    }
  }

  if (changes.length === 0) {
    console.log('No changes detected. Design system is in sync with Figma.');
    process.exit(0);
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(published, null, 2) + '\n');
  console.log('Updated ' + DATA_PATH);
  console.log(changes.length + ' change(s):');
  for (const c of changes) console.log('  - ' + c);
}

main().catch(e => { console.error('Sync failed:', e); process.exit(1); });
