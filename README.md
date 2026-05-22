# hyogen.ai

Open-source, local-first macOS app for agentic short-form video creation.

hyogen.ai lets creators direct AI agents through chat to create high-quality 9:16 Shorts/Reels/TikTok-style videos. The MVP focuses on faceless explainer/story/news shorts with sourced or generated visuals, expressive TTS, captions, music, Remotion-generated graphics, FFmpeg rendering, QA, and a final publish-ready local package.

## Current Status

Planning/docs phase. Fresh source-of-truth docs:

- `HYOGEN_PRD.md` — product requirements.
- `HYOGEN_MVP_SPEC.md` — implementation spec.

Legacy docs/prototype have been archived under `docs/archive/legacy-2026-05-16/`.

## MVP Principles

- OSS-first, AGPL-3.0 planned.
- macOS Apple Silicon first.
- Tauri 2 + Rust core + managed DeepAgents runtime + React/TypeScript/Vite/Tailwind.
- DeepAgents-backed guided stage harness; no custom Rust agent harness.
- BYOK provider setup; credentials in macOS Keychain.
- No license gate, telemetry, cloud sync, hosted backend, or direct publishing in MVP.
- Chat-mediated creative changes; no manual timeline/editor.
- Local project folders and full local observability.

## Core Workflow

```txt
Brief / Recipe
→ Research + source discovery
→ Script draft
→ Script approval
→ Media discovery/download/indexing
→ Shot-level visual plan
→ Visual/assets approval
→ Voice/captions/music
→ Render
→ QA
→ Final package
→ Cleanup
```

## Development

Implementation has not started yet. See `HYOGEN_MVP_SPEC.md` for planned modules, DeepAgents stage harness, storage model, managed runtimes, and local verification strategy.
