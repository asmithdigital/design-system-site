#!/usr/bin/env node
/**
 * Reads the most recent git commit message and updates changelogs in JSON data files.
 *
 * Supported commit message syntax:
 *   [component:Primary Button] Description of the change
 *   [pattern:Payment Flow] Description of the change
 *   [template:Quote Step Page] Description of the change
 *
 * Type is inferred from keywords in the description:
 *   "add" / "new"           → added
 *   "chang" / "updat"       → changed
 *   "fix" / "patch" / "bug" → fixed
 *   "remov" / "delet"       → removed
 *   (default)               → changed
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')

function inferType(description) {
  const d = description.toLowerCase()
  if (/\b(add|new|creat|introduc)\b/.test(d)) return 'added'
  if (/\b(fix|patch|bug|correct|resolv)\b/.test(d)) return 'fixed'
  if (/\b(remov|delet|deprecat|drop)\b/.test(d)) return 'removed'
  return 'changed'
}

function getToday() {
  return new Date().toISOString().slice(0, 10)
}

function parseCommitMessage(msg) {
  const pattern = /\[(component|pattern|template):([^\]]+)\]\s*(.+)/gi
  const entries = []
  let match
  while ((match = pattern.exec(msg)) !== null) {
    entries.push({
      kind: match[1].toLowerCase(),
      name: match[2].trim(),
      description: match[3].trim(),
    })
  }
  return entries
}

function updateComponents(name, description) {
  const filePath = join(dataDir, 'components.json')
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  const component = data.components.find(c => c.name.toLowerCase() === name.toLowerCase())
  if (!component) {
    console.warn(`[update-changelog] Component not found: "${name}"`)
    return false
  }
  if (!component.changelog) component.changelog = []
  component.changelog.push({
    date: getToday(),
    type: inferType(description),
    description,
  })
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log(`[update-changelog] Updated component "${component.name}"`)
  return true
}

function updatePatterns(name, description) {
  const filePath = join(dataDir, 'patterns.json')
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  const pattern = data.patterns.find(p => p.name.toLowerCase() === name.toLowerCase())
  if (!pattern) {
    console.warn(`[update-changelog] Pattern not found: "${name}"`)
    return false
  }
  if (!pattern.changelog) pattern.changelog = []
  pattern.changelog.push({
    date: getToday(),
    type: inferType(description),
    description,
  })
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log(`[update-changelog] Updated pattern "${pattern.name}"`)
  return true
}

function updateTemplates(name, description) {
  const filePath = join(dataDir, 'templates.json')
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  const template = data.templates.find(t => t.name.toLowerCase() === name.toLowerCase())
  if (!template) {
    console.warn(`[update-changelog] Template not found: "${name}"`)
    return false
  }
  if (!template.changelog) template.changelog = []
  template.changelog.push({
    date: getToday(),
    type: inferType(description),
    description,
  })
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log(`[update-changelog] Updated template "${template.name}"`)
  return true
}

function main() {
  let commitMsg
  try {
    commitMsg = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim()
  } catch {
    console.error('[update-changelog] Could not read git commit message')
    process.exit(0)
  }

  const entries = parseCommitMessage(commitMsg)
  if (entries.length === 0) {
    process.exit(0)
  }

  let updated = false
  for (const entry of entries) {
    if (entry.kind === 'component') updated = updateComponents(entry.name, entry.description) || updated
    else if (entry.kind === 'pattern') updated = updatePatterns(entry.name, entry.description) || updated
    else if (entry.kind === 'template') updated = updateTemplates(entry.name, entry.description) || updated
  }

  if (updated) {
    try {
      execSync('git add data/components.json data/patterns.json data/templates.json', { stdio: 'inherit' })
      execSync('git commit --amend --no-edit --no-gpg-sign', { stdio: 'inherit' })
      console.log('[update-changelog] Amended commit with changelog updates')
    } catch (e) {
      console.warn('[update-changelog] Could not amend commit:', e.message)
    }
  }
}

main()
