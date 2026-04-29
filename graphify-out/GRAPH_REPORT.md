# Graph Report - /Users/alaabenrejeb/Desktop/real estate funnel /funnel  (2026-04-29)

## Corpus Check
- Corpus is ~11,341 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 40 edges · 19 communities detected
- Extraction: 78% EXTRACTED · 22% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Static Assets|Static Assets]]
- [[_COMMUNITY_Lead Capture & Quiz Flow|Lead Capture & Quiz Flow]]
- [[_COMMUNITY_Language & Footer|Language & Footer]]
- [[_COMMUNITY_Card UI Component|Card UI Component]]
- [[_COMMUNITY_Progress Bar Component|Progress Bar Component]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Agent & Config Docs|Agent & Config Docs]]
- [[_COMMUNITY_App Layout|App Layout]]
- [[_COMMUNITY_Page Entry Point|Page Entry Point]]
- [[_COMMUNITY_Button Component|Button Component]]
- [[_COMMUNITY_Input Component|Input Component]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_TypeScript Env|TypeScript Env]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Video Section|Video Section]]
- [[_COMMUNITY_Quiz Legacy Exports|Quiz Legacy Exports]]
- [[_COMMUNITY_Supabase Client|Supabase Client]]

## God Nodes (most connected - your core abstractions)
1. `Next.js Project (Real Estate Funnel)` - 9 edges
2. `submitPhone()` - 3 edges
3. `Vercel Platform (deployment)` - 3 edges
4. `Next.js Agent Rules (AGENTS.md)` - 3 edges
5. `Footer()` - 2 edges
6. `useLang()` - 2 edges
7. `calculateResult()` - 2 edges
8. `Next.js Framework` - 2 edges
9. `next/font (font optimization)` - 2 edges
10. `Geist Font (Vercel)` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Project (Real Estate Funnel)` --conceptually_related_to--> `File/Document Icon (file.svg)`  [INFERRED]
  README.md → public/file.svg
- `Next.js Project (Real Estate Funnel)` --conceptually_related_to--> `Globe/Web Icon (globe.svg)`  [INFERRED]
  README.md → public/globe.svg
- `Next.js Project (Real Estate Funnel)` --conceptually_related_to--> `Browser Window Icon (window.svg)`  [INFERRED]
  README.md → public/window.svg
- `Next.js Framework` --conceptually_related_to--> `Next.js Wordmark Logo (next.svg)`  [INFERRED]
  README.md → public/next.svg
- `Vercel Platform (deployment)` --conceptually_related_to--> `Vercel Logo/Triangle Icon (vercel.svg)`  [INFERRED]
  README.md → public/vercel.svg

## Communities

### Community 0 - "Static Assets"
Cohesion: 0.18
Nodes (12): File/Document Icon (file.svg), Globe/Web Icon (globe.svg), Next.js Wordmark Logo (next.svg), Vercel Logo/Triangle Icon (vercel.svg), Browser Window Icon (window.svg), app/page.tsx (entry page), create-next-app, Geist Font (Vercel) (+4 more)

### Community 1 - "Lead Capture & Quiz Flow"
Cohesion: 0.18
Nodes (3): saveLead(), submitPhone(), calculateResult()

### Community 2 - "Language & Footer"
Cohesion: 0.4
Nodes (2): Footer(), useLang()

### Community 3 - "Card UI Component"
Cohesion: 0.67
Nodes (0): 

### Community 4 - "Progress Bar Component"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "Hero Section"
Cohesion: 0.67
Nodes (0): 

### Community 6 - "Agent & Config Docs"
Cohesion: 0.67
Nodes (3): Next.js Agent Rules (AGENTS.md), node_modules/next/dist/docs/ (local Next.js docs), CLAUDE.md @AGENTS.md include directive

### Community 7 - "App Layout"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Page Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Button Component"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Input Component"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Utility Functions"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "TypeScript Env"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "ESLint Config"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Next.js Config"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Video Section"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Quiz Legacy Exports"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Supabase Client"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **9 isolated node(s):** `create-next-app`, `app/page.tsx (entry page)`, `node_modules/next/dist/docs/ (local Next.js docs)`, `CLAUDE.md @AGENTS.md include directive`, `File/Document Icon (file.svg)` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `App Layout`** (2 nodes): `RootLayout()`, `layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Page Entry Point`** (2 nodes): `Home()`, `page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button Component`** (2 nodes): `cn()`, `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input Component`** (2 nodes): `Input()`, `input.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utility Functions`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `TypeScript Env`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `ESLint Config`** (1 nodes): `eslint.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Next.js Config`** (1 nodes): `next.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Video Section`** (1 nodes): `video-section.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Quiz Legacy Exports`** (1 nodes): `quiz.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Supabase Client`** (1 nodes): `supabase.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Next.js Project (Real Estate Funnel)` connect `Static Assets` to `Agent & Config Docs`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `Next.js Agent Rules (AGENTS.md)` connect `Agent & Config Docs` to `Static Assets`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Next.js Project (Real Estate Funnel)` (e.g. with `File/Document Icon (file.svg)` and `Globe/Web Icon (globe.svg)`) actually correct?**
  _`Next.js Project (Real Estate Funnel)` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `submitPhone()` (e.g. with `saveLead()` and `calculateResult()`) actually correct?**
  _`submitPhone()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Vercel Platform (deployment)` (e.g. with `Geist Font (Vercel)` and `Vercel Logo/Triangle Icon (vercel.svg)`) actually correct?**
  _`Vercel Platform (deployment)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `create-next-app`, `app/page.tsx (entry page)`, `node_modules/next/dist/docs/ (local Next.js docs)` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._