# Figma Auto-Sync

## What this does

A GitHub Action that automatically checks the Figma design system file for changes and updates the design system documentation site. When enabled, it runs daily at 6am ACST.

The script reads the Figma file via the REST API (not the MCP connector, so there's no monthly call limit), compares the published components against components.json, and if anything is new or changed, it updates the JSON with changelog entries, commits, and pushes. The existing deploy workflow then rebuilds the site automatically.

## Current status: Ready but not scheduled

The demo design system has sample data that was generated to show what a full system looks like. The Figma file only contains the components created during the demo (Button, Text Input, Card, Bottom Nav Bar). If the sync runs now, it would flag the sample components as missing from Figma.

When the real design system is in place with all components published in Figma, enable the daily schedule.

## How to enable

### Step 1: Add GitHub secrets

Go to the repo Settings > Secrets and variables > Actions > New repository secret

Add two secrets:
- FIGMA_TOKEN — your Figma personal access token (starts with figd_)
- FIGMA_DS_FILE_KEY — the file key from your Figma design system URL (the ID between /design/ and /file-name)

### Step 2: Enable the schedule

Edit .github/workflows/sync-figma.yml

Find the commented-out schedule block near the top and uncomment it:

```yaml
on:
  schedule:
    - cron: '30 20 * * *'
  workflow_dispatch:
```

Remove the standalone `on: workflow_dispatch:` block that's currently active.

### Step 3: Test manually

Go to the repo's Actions tab in GitHub, click "Sync Design System from Figma", click "Run workflow". Watch it run. If it finds changes, it commits them. If everything's in sync, it exits cleanly.

## How it works

1. GitHub Action triggers (daily schedule or manual)
2. Script calls Figma REST API to get published components
3. Groups components by root name (e.g. "Button/Default" and "Button/Disabled" both belong to "Button")
4. Reads the current components.json from the repo
5. Compares: new components get added, new variants get added, missing components get flagged (not deleted)
6. If changes found: writes updated JSON with dated changelog entries
7. GitHub Action commits and pushes
8. Existing deploy.yml rebuilds the site

## Rate limits

- Figma REST API: ~30 requests per minute. This script makes 1 call per run.
- GitHub Actions free tier: 2000 minutes per month. This uses ~15 minutes per month.

## What this means for designers

Designers publish component updates in the Figma design system library as they normally would. The system picks up the changes overnight. No extra steps needed. In the future, ZeroHeight would handle this natively with its built-in Figma sync.
