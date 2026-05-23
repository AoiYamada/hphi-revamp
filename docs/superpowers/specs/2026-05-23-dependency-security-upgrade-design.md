# Dependency Security Upgrade — Design Spec

**Date:** 2026-05-23
**Scope:** Security-focused patch/minor upgrades for Next.js, Payload CMS, and key dependencies. No major version bumps.

---

## Goal

Apply available security fixes across Next.js, Payload CMS, and security-sensitive libraries without introducing breaking changes from major version upgrades.

---

## Changes

### Next.js ecosystem — 15.3.8 → 15.4.11

| Package | From | To |
|---|---|---|
| `next` | 15.3.8 | 15.4.11 |
| `@next/third-parties` | 15.2.2 | 15.4.11 |
| `eslint-config-next` | 15.2.2 | 15.4.11 |
| `@next/eslint-plugin-next` | 15.2.2 | 15.4.11 |

15.4.11 is the latest Next.js 15 release compatible with Payload 3.84.1 (verified via `@payloadcms/next` peer dep range: `>=15.4.11 <15.5.0`).

### Payload CMS — 3.28.1 → 3.84.1

All packages pinned to the same version (Payload requires exact version alignment):

- `payload`
- `@payloadcms/db-mongodb`
- `@payloadcms/email-nodemailer`
- `@payloadcms/live-preview-react`
- `@payloadcms/next`
- `@payloadcms/plugin-form-builder`
- `@payloadcms/plugin-nested-docs`
- `@payloadcms/plugin-redirects`
- `@payloadcms/plugin-search`
- `@payloadcms/plugin-seo`
- `@payloadcms/richtext-lexical`
- `@payloadcms/ui`

`@payloadcms/eslint-config` stays at 3.28.0 — it has its own release cadence and 3.28.0 is already the latest.

### Security-sensitive dependencies

| Package | From | To |
|---|---|---|
| `jsonwebtoken` | 9.0.2 | 9.0.3 |
| `sharp` | 0.33.5 | 0.34.5 |
| `graphql` | 16.10.0 | 16.14.0 |
| `postcss` | 8.5.3 | 8.5.15 |

### Type definitions (devDependencies)

| Package | From | To |
|---|---|---|
| `@types/react` | 19.0.10 | 19.2.15 |
| `@types/react-dom` | 19.0.4 | 19.2.3 |
| `@types/jsonwebtoken` | 9.0.9 | 9.0.10 |

Note: `package.json` has an `overrides` section that hard-pins `@types/react` and `@types/react-dom`. After the upgrade, attempt to **remove the overrides entirely** — they should no longer be needed once Payload 3.84.1 aligns its peer deps. If `pnpm build` produces type conflicts, fall back to updating the pinned versions to match the new type definitions.

---

## Skipped (major version bumps — deferred)

| Package | Current | Latest | Reason skipped |
|---|---|---|---|
| `tailwindcss` | 3.4.3 | 4.3.0 | Config format changed in v4 |
| `tailwind-merge` | 2.6.0 | 3.6.0 | API changes in v3 |
| `eslint` | 8.57.1 | 10.4.0 | Config format changed in v9+ |
| `typescript` | 5.7.2 | 6.0.3 | Potential strictness breakage |
| `react-day-picker` | 9.6.3 | 10.0.1 | Breaking API changes |
| `lucide-react` | 0.513.0 | 1.16.0 | Icon renames in v1 |
| `cross-env` | 7.0.3 | 10.1.0 | Major version |

React 19.1.0 is already at the latest stable release — no upgrade needed.

---

## Verification

After install:

1. `pnpm build` — confirms no Payload 3.28→3.84 API breaking changes surface at build time
2. Check admin panel loads at `/admin`
3. Check frontend renders at `/`

---

## Risk

The Payload jump (3.28→3.84 = 56 minor versions) is the highest-risk change. Payload uses semver strictly within v3, so breaking changes are unlikely, but collection/block config API surface is large. A successful `pnpm build` is the primary signal.
