# Dependency Security Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Next.js to 15.4.11, all Payload packages to 3.84.1, and key security-sensitive dependencies to their latest patch releases.

**Architecture:** Single `package.json` edit followed by a clean reinstall and build verification. No code changes are expected, but the Payload 3.28→3.84 jump (56 minor versions) may surface API breakage at build time — tasks 3 and 4 handle that case.

**Tech Stack:** Next.js 15, Payload CMS 3, pnpm 11, Node ≥22.12.0

> **No test suite exists in this project** (see CLAUDE.md). Verification is via `pnpm build` and manual spot-checks of the admin panel and frontend. Do not invent or add tests.

---

## Files

- Modify: `package.json` — version bumps + remove `overrides` section

---

### Task 1: Update package.json versions

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Apply all version changes**

Open `package.json` and make the following exact changes.

In `dependencies`, update:

```json
"@next/third-parties": "15.4.11",
"@payloadcms/db-mongodb": "3.84.1",
"@payloadcms/email-nodemailer": "3.84.1",
"@payloadcms/live-preview-react": "3.84.1",
"@payloadcms/next": "3.84.1",
"@payloadcms/plugin-form-builder": "3.84.1",
"@payloadcms/plugin-nested-docs": "3.84.1",
"@payloadcms/plugin-redirects": "3.84.1",
"@payloadcms/plugin-search": "3.84.1",
"@payloadcms/plugin-seo": "3.84.1",
"@payloadcms/richtext-lexical": "3.84.1",
"@payloadcms/ui": "3.84.1",
"graphql": "16.14.0",
"jsonwebtoken": "9.0.3",
"next": "15.4.11",
"payload": "3.84.1",
"sharp": "0.34.5",
```

In `devDependencies`, update:

```json
"@next/eslint-plugin-next": "15.4.11",
"@types/jsonwebtoken": "9.0.10",
"@types/react": "19.2.15",
"@types/react-dom": "19.2.3",
"eslint-config-next": "15.4.11",
"postcss": "8.5.15",
```

- [ ] **Step 2: Remove the `overrides` section entirely**

Delete these lines from `package.json`:

```json
"overrides": {
  "@types/react": "19.0.10",
  "@types/react-dom": "19.0.4"
},
```

The upgraded Payload 3.84.1 packages align their `@types/react` peer deps correctly, so the override is no longer needed.

- [ ] **Step 3: Verify the JSON is still valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('valid')"
```

Expected output: `valid`

---

### Task 2: Install dependencies

**Files:** (none — lockfile only)

- [ ] **Step 1: Delete the old lockfile and reinstall**

```bash
pnpm ii
```

> This project uses `pnpm ii` (alias for `pnpm install --ignore-workspace`), not bare `pnpm install`. This is required — do not change the command.

Expected: install completes with no `WARN` about unmet peer dependencies for `next` or `@types/react`.

- [ ] **Step 2: Check for peer dependency warnings**

Scan the install output for lines containing `WARN` or `peer dep`. If you see:

```
WARN  Issues with peer dependencies found
```

Run:
```bash
pnpm why @types/react
pnpm why next
```

If any package still pulls in `@types/react <19.2` or `next <15.4`, note it but do not add overrides yet — wait for the build to fail first before re-adding.

---

### Task 3: Run the build

**Files:** (none unless errors require fixes)

- [ ] **Step 1: Run the full Next.js build**

```bash
pnpm build
```

Expected: build completes successfully with no errors. Warnings are acceptable.

- [ ] **Step 2: If the build passes — commit and skip to Task 5**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: upgrade Next.js to 15.4.11, Payload to 3.84.1, security deps"
```

Then skip directly to Task 5.

---

### Task 4: Fix build errors (only if Task 3 fails)

Run this task only if `pnpm build` produced errors. Work through each error category below.

**Files:** Varies by error — check the compiler output.

- [ ] **Step 1: Identify error category**

Read the first error in the build output carefully. Match it to one of the categories below and follow only that section.

---

**Category A — `@types/react` version conflict**

Symptom:
```
Type error: ... is not assignable to type ... (react/index.d.ts)
```

Fix: re-add the override in `package.json` with the new version:

```json
"overrides": {
  "@types/react": "19.2.15",
  "@types/react-dom": "19.2.3"
}
```

Then rerun `pnpm ii` and `pnpm build`.

---

**Category B — Payload collection/block config API change**

Symptom:
```
Type error: Property 'X' does not exist on type 'CollectionConfig'
```
or
```
Type error: Argument of type '...' is not assignable to parameter of type 'Block'
```

Fix steps:
1. Note the exact property name and file path from the error.
2. Check the Payload 3.x migration notes: https://payloadcms.com/docs/migration-guides
3. Most common changes between 3.28 and 3.84:
   - `admin.useAsTitle` → may have moved, check collection config type
   - Block `fields` array — verify no renamed field types
4. Apply the minimal change to match the new API and rerun `pnpm build`.

---

**Category C — Payload hook signature change**

Symptom:
```
Type error: Argument of type '(args: { doc: ... }) => ...' is not assignable
```

Fix: Look at the failing hook in `src/collections/` or `src/globals/`. Check the new hook type signature via:
```bash
node -e "const p = require('./node_modules/payload/dist/types.js'); console.log(Object.keys(p))" 2>/dev/null | head -5
```
Then update the hook function signature to match.

---

**Category D — Next.js 15.4 API change**

Symptom: error in `src/app/` files referencing Next.js internals.

Fix: Check https://nextjs.org/docs/app/building-your-application/upgrading for 15.3→15.4 changes. Most common: `params` and `searchParams` in page components may now require `await` if they're Promises. Update the affected page component.

---

- [ ] **Step 2: After fixing each error, rerun build**

```bash
pnpm build
```

Repeat until the build is clean.

- [ ] **Step 3: Commit with fixes**

```bash
git add package.json pnpm-lock.yaml
# add any source files you had to change:
git add src/
git commit -m "chore: upgrade Next.js to 15.4.11, Payload to 3.84.1, security deps

Fix post-upgrade API compatibility issues."
```

---

### Task 5: Verify the running site

- [ ] **Step 1: Start the development server**

```bash
pnpm dev
```

Wait for:
```
▲ Next.js 15.4.11
- Local: http://localhost:3000
✓ Ready
```

- [ ] **Step 2: Check the frontend**

Open http://localhost:3000 in a browser. Verify:
- Home page renders without a blank screen or runtime error
- No red error overlays in the browser

- [ ] **Step 3: Check the admin panel**

Open http://localhost:3000/admin in a browser. Verify:
- Login page renders
- After logging in, collections (Pages, Posts, Courses, Tutors, Media) appear in the sidebar
- Opening a document and editing a field works without console errors

- [ ] **Step 4: Stop the dev server**

`Ctrl+C`

---

### Task 6: Final commit (if not already committed in Task 3/4)

- [ ] **Step 1: Confirm git status is clean**

```bash
git status
```

Expected: `nothing to commit, working tree clean`

If there are uncommitted changes, commit them now:

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: upgrade Next.js to 15.4.11, Payload to 3.84.1, security deps"
```
