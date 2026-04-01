# CLAUDE.md — 99Duas / Claude Artifacts React

## Project Overview

This repo is a template for deploying Claude artifacts as standalone websites. It wraps a Vite + React scaffold around a single artifact component file, pre-loading all common Claude artifact dependencies (shadcn/ui, Radix UI, Recharts, Tailwind, etc.) so no additional package installs are needed.

The current artifact is **`duas_99_names.jsx`** — an interactive collection of Islamic duas organized around the 99 Names of Allah.

---

## How to Deploy a New Artifact

1. Copy the React code from Claude (the full component, including imports if any).
2. Paste it into `src/ArtifactCode.jsx`, replacing the existing content.
3. If the artifact is stored as a separate file (e.g., `duas_99_names.jsx`), copy its content into `src/ArtifactCode.jsx` — that is the file `src/App.jsx` renders.
4. Commit and push. Vercel/Cloudflare Pages will auto-deploy.

The render path is: `index.html` → `src/main.jsx` → `src/App.jsx` → `src/ArtifactCode.jsx`.

---

## Development Commands

Uses **pnpm** (not npm or yarn).

```bash
pnpm install       # Install dependencies
pnpm dev           # Start local dev server (http://localhost:5173)
pnpm build         # Production build → dist/
pnpm preview       # Preview the production build locally
pnpm lint          # ESLint (zero warnings allowed)
```

---

## Repository Structure

```
99Duas/
├── duas_99_names.jsx        # The actual artifact (source of truth for the app)
├── src/
│   ├── ArtifactCode.jsx     # Entry point for the artifact — paste/import here
│   ├── App.jsx              # Thin wrapper that renders <ArtifactCode />
│   ├── main.jsx             # React 18 root mount
│   ├── index.css            # Tailwind directives + CSS variable theme
│   ├── App.css              # Minimal app-level styles
│   ├── lib/utils.js         # cn() helper (clsx + tailwind-merge)
│   └── components/ui/       # 45+ pre-built shadcn/ui components
├── public/                  # Static assets
├── index.html               # HTML shell
├── vite.config.js           # Vite config (@/ path alias → src/)
├── tailwind.config.js       # Tailwind theme (CSS variable-based, dark mode)
├── jsconfig.json            # Path alias: @/* → src/*
├── components.json          # shadcn/ui config
├── package.json             # Scripts and all pre-installed dependencies
└── pnpm-lock.yaml           # Lockfile
```

---

## Current Artifact: duas_99_names.jsx

A self-contained ~1600-line React component. Key characteristics:

**Data arrays (all hardcoded at top of file):**
- `D` — 100 entries (index 0 = "Allah", 1–99 = the 99 Names). Each entry is a tuple: `[id, arabicName, meaning, categoryIndex, explanation, personalDua]`
- `CS` — 13 category strings (Forgiveness, Deen & Sincerity, Protection, etc.)
- `HT` — 13 "Heart Themes" (spiritual/emotional foundations with title + body text)

**Color constants (Islamic gold/black aesthetic):**
```js
G   = "#D4A853"  // Gold primary
Gd  = "#8B7335"  // Gold dark
Gf  = "#5A4D2E"  // Gold fade
BG  = "#0D0C0A"  // Background black
SF  = "#141210"  // Surface
BD  = "#252117"  // Border
```

**Three tabs:**
- `Du'as` — Category-grouped, searchable, with favorites
- `99 Names` — Full list + flashcard memorization mode
- `My Heart` — Expandable Heart Theme sections

**Notable features:** search, favorites (React state only), focus/full-screen mode, flashcards, floating random dua button, category collapsing.

**Styling:** Pure inline styles throughout. No Tailwind classes, no shadcn components — the template's component library is available but unused in this artifact.

---

## Available Dependencies (Pre-installed)

All standard Claude artifact dependencies are already in `package.json`. Artifacts can import any of these without additional installation:

| Category | Packages |
|---|---|
| UI Components | shadcn/ui (`@/components/ui/*`), all Radix UI primitives |
| Icons | `lucide-react` |
| Styling | Tailwind CSS, `tailwind-merge`, `class-variance-authority` |
| Charts | `recharts` |
| Forms | `react-hook-form`, `zod` |
| Notifications | `sonner` |
| Date | `date-fns`, `react-day-picker` |
| Other | `cmdk`, `embla-carousel-react`, `vaul`, `next-themes` |

Import shadcn components via the `@/` alias, e.g.:
```js
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

---

## Key Conventions

- **Package manager:** pnpm only. Never use npm or yarn.
- **Path alias:** `@/` resolves to `src/`. Use it for all internal imports.
- **Lint:** `--max-warnings 0` — ESLint must pass clean before committing.
- **ArtifactCode.jsx is the integration point.** All artifact code lives there (or is imported into it). Do not restructure `App.jsx` or `main.jsx`.
- **Artifacts with inline styles:** If the artifact uses inline styles + its own color system (like duas_99_names.jsx), leave it as-is. Don't migrate to Tailwind unless asked.
- **Artifacts using Tailwind:** The global CSS variables in `src/index.css` define the theme. Shadcn components inherit these automatically.

---

## Git Workflow

Active development branch: `claude/add-claude-documentation-WqDf5`

```bash
git checkout claude/add-claude-documentation-WqDf5
# make changes
git add <files>
git commit -m "descriptive message"
git push -u origin claude/add-claude-documentation-WqDf5
```

---

## Deployment

One-click options from the original template:
- **Vercel** — connect repo, auto-deploys on push to main
- **Cloudflare Pages** — same pattern

Build output is `dist/` (standard Vite static output). No server-side rendering.

---

## Pending Work

- [ ] **Replace all 100 dua texts** — The file `My Dua Collection 99 Names.pdf` in the repo root contains the complete, revised personal duas. Each entry in the `D` array has a `personalDua` field (index 5 in the tuple) that needs to be replaced with the corresponding dua from the PDF, matched by Name number (0–99). The PDF duas are significantly longer and more personal than the current placeholder versions.
