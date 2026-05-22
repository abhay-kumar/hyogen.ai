# hyogen.ai MVP Implementation Spec

Derived from `HYOGEN_PRD.md`. This is the engineering source of truth for the OSS MVP.

## 1. MVP Shape

hyogen.ai is a local-first, OSS, macOS Apple Silicon desktop app for high-quality agentic short-form vertical video creation.

The MVP builds one publish-ready vertical short package at a time. Its success bar is one excellent Reference Workflow for a solo/prosumer creator making a faceless factual explainer/news short: prompt or sources, researched script, approved visuals/audio, 1080×1920 MP4, captions/SRT, metadata, attribution/citations, QA report, final local package, and inspectable traces. It uses a DeepAgents-backed guided stage harness with chat-mediated creative changes, local project folders, SQLite metadata, managed media/tooling runtimes, provider BYOK, and strong local observability. Rust remains the native app, persistence, security, filesystem, and process boundary; DeepAgents owns workflow orchestration.

## 2. Tracer-Bullet First Slice

Build the first vertical slice before expanding subsystems:

1. First-run workspace selection.
2. Managed DeepAgents runtime bootstrap and health check.
3. Provider setup with at least text LLM + TTS.
4. Minimal Brand Profile.
5. New project from prompt.
6. Script generation.
7. Script approval.
8. Segmented TTS generation.
9. Basic visual plan using user media, approved image generation, or generated backgrounds.
10. Caption generation if feasible; otherwise basic text overlay fallback.
11. FFmpeg render to 1080×1920 MP4.
12. Final package folder.
13. Trace viewer with DeepAgents run/stage/tool/provider/child-process logs.

Then add, in order:

1. Media discovery/download.
2. Media indexing and normalization.
3. Shot-level visual planner.
4. Media validation/contact sheets.
5. Caption alignment and SRT output.
6. Remotion graphic/data-viz shot generation.
7. Post-render QA.
8. Cleanup/finalization.
9. Saved recipes and daily/trending memory.

## 3. Deep Modules

### 3.1 DeepAgents Stage Harness

Deep module interface: run the guided workflow in DeepAgents, accept user intents from Tauri, load and persist project state through Rust-backed storage tools, transition stages, emit events, persist versions, and record traces.

Responsibilities:

- Implement the canonical guided stage graph in DeepAgents; do not duplicate it as a custom Rust harness.
- Enforce approval gates as explicit interrupts/checkpoints.
- Handle backward jumps and downstream invalidation.
- Coordinate provider adapters, media tools, renderer, QA, and cleanup.
- Call model/provider adapters from DeepAgents using credential access brokered by Rust/Keychain.
- Use Rust/Tauri APIs for SQLite, filesystem, managed child processes, and cleanup rather than arbitrary harness-side access.
- Ensure consistency if frontend, Rust shell, or DeepAgents runtime reloads/crashes by persisting checkpoints and artifact versions.
- Maintain one-heavy-job-at-a-time policy.

### 3.2 Workspace and Project Store

Deep module interface: persist/retrieve workspace, Brand Profiles, projects, variations, artifacts, approvals, traces, and manifests.

Responsibilities:

- SQLite operational source of truth.
- Local project folder manifests/snapshots.
- Project import/relink from manifest.
- Archive/delete/cleanup semantics.
- Stable IDs and content hashes.
- Versioned artifacts.

### 3.3 Provider Capability Registry and Adapters

Deep module interface: register provider connections, expose capability metadata to DeepAgents, call providers from DeepAgents with Rust-brokered credentials, trace/redact calls, and validate outputs.

Providers/capabilities:

- OpenAI.
- OpenAI-compatible APIs.
- OpenRouter.
- Anthropic.
- Gemini.
- Ollama/local best-effort.
- ElevenLabs.
- Text LLM, vision/keyframes, QA, provider-native search/grounding, TTS plain, TTS SSML/emotion, image generation.

### 3.4 Credential Manager

Deep module interface: create/read/delete credential references without exposing raw secrets.

Responsibilities:

- macOS Keychain integration.
- SQLite stores only credential refs.
- Scoped secret brokerage to DeepAgents provider calls without persisting raw keys.
- Redaction for logs/traces/debug bundles.
- Test-double support for local tests.

### 3.5 Observability and Trace Store

Deep module interface: create runs/spans/events/artifact records and query/export them.

Responsibilities:

- DeepAgents runs and checkpoints.
- Stage runs.
- Tool calls.
- Provider calls.
- Child process calls.
- Prompt/response logs.
- Artifact events.
- State transitions.
- Error summaries.
- Safe/full debug bundles.
- Optional Phoenix export.

No hidden chain-of-thought is stored or displayed.

### 3.6 Search and Source Materialization

Deep module interface: search/query/fetch candidate sources and materialize them as local source records.

Sources:

- Provider-native search/grounding leads.
- BYOK search APIs.
- Direct URLs.
- YouTube search/download via managed yt-dlp.
- Public/free media APIs.
- Google Images scraping fallback via managed Playwright/Chromium.
- Local files/folders.

Rules:

- Provider-native results are discovery leads, not final evidence.
- Any final-used fact/media must be materialized by hyogen.
- Public media only; no private/login-gated downloads.
- Conservative rights labels.

### 3.7 Media Pool, Ingestion, and Indexing

Deep module interface: add media candidate, download/copy/reference it, normalize/index it, expose searchable artifacts.

Responsibilities:

- Project-local media pool.
- Incremental indexing as downloads complete.
- MIME detection.
- Image normalization.
- Video metadata/probe.
- Thumbnails/contact sheets/keyframes.
- Audio/transcript/OCR where practical.
- Visual tags/descriptions.
- Rights/source/attribution metadata.
- Stable IDs and hashes.
- Project-aware cleanup.

### 3.8 Script and Citation Engine

Deep module interface: generate/revise script versions and claim citations from project context.

Responsibilities:

- Content modes: factual explainer, opinion/commentary, fictional/storytelling, product/brand promo, educational/how-to.
- Hook-first short-form writing.
- Claim extraction and advisory verification.
- Script versioning.
- Chat-only revisions.
- Source/claim citation records.

### 3.9 Shorts Quality Rules Engine

Deep module interface: evaluate scripts/plans/media/renders and return issues with severity, repairability, and suggested fixes.

Rules include:

- Hook/cold-open quality.
- Avoid generic intros.
- Narrative tension and why-care.
- One entity/concept per shot where practical.
- No static image hold over target threshold.
- Visual variety.
- Citation expectations by content mode.
- Selected media validation confidence.
- Caption safe zones.
- CTA defaults.
- Duration target.
- Render technical readiness.

### 3.10 Visual Planner

Deep module interface: convert approved script + indexed media into shot-level visual plan.

Hierarchy:

- Script Segment.
- Visual Scene.
- Shot.

Shot fields:

- Stable ID.
- Label.
- Text cue/script span.
- Source type.
- Intended visual description.
- Candidate/selected asset usage.
- Rights label.
- Motion/fit/crop.
- Transition in.
- Color grade.
- Validation status.
- Timing estimate and final audio-aligned timing.

### 3.11 Voice Performance and TTS

Deep module interface: generate provider-agnostic voice performance, compile to provider format, generate segmented audio, cache/reuse safely.

Responsibilities:

- Clean script remains canonical.
- Voice Performance IR stores emotion, intensity, pace, pitch, pauses, emphasis, pronunciation overrides.
- Compile to Gemini/ElevenLabs/OpenAI or fallback plain text/instructions.
- Segmented TTS like F1.ai.
- Content-hash caching.
- Audio preview approval.
- Pronunciation dictionary at Brand/Profile and project scope.

### 3.12 Caption and Alignment Engine

Deep module interface: align approved script to generated audio and produce caption timing/styles/sidecars.

Responsibilities:

- Word timestamps when available.
- Estimated fallback.
- Burned-caption timing data.
- SRT output.
- Caption presets.
- Safe-region awareness.
- Sync QA flags.

### 3.13 Remotion Graphic Shot Generator

Deep module interface: receive a structured graphic shot spec, generate sandboxed Remotion content, render a shot asset, validate output.

Responsibilities:

- Managed Node/Remotion runtime.
- Constrained generated code.
- Pinned allowed dependencies.
- No network/arbitrary filesystem access.
- TypeScript/static checks.
- Timeout/memory/cancel handling.
- Preview/contact sheet validation.
- Rendered MP4 registered as immutable media asset.

### 3.14 FFmpeg Renderer

Deep module interface: compile approved shot plan + audio + captions + media inputs into final MP4.

Capabilities:

- 1080×1920 canvas.
- 30fps normalization.
- VideoToolbox H.264 on macOS with CPU fallback.
- Image/video/generated/Remotion shots.
- Trim/crop/scale/blur-pad.
- Ken Burns/pan/zoom.
- Color grading presets.
- Text/quote/logo overlays.
- Burned captions.
- Background music and SFX mix.
- Hard cuts and simple transitions.
- Source audio muted by default.
- Render recipe/manifests and FFmpeg logs.

### 3.15 QA Engine

Deep module interface: run post-render checks and return structured QA report.

Checks:

- Local technical: duration, resolution, codec, fps, audio stream, black frames, silence/clipping/loudness, captions/sidecars, manifest consistency.
- AI semantic: sampled frames/contact sheets, approved script, visual plan, asset manifest, caption timing, rendered transcript/reference.
- Optional deep provider video QA.
- Brand/style compliance.
- Safety/policy advisory warnings.

### 3.16 Final Package Exporter

Deep module interface: freeze a final render and export/copy package contents.

Package contents:

- Final MP4.
- Metadata text/markdown.
- SRT captions.
- Manifest.
- Asset attribution report.
- Claim citations report.
- QA report.
- Optional normalized used media.

### 3.17 Brand Profile, Recipes, and Memory

Deep module interface: manage durable creator defaults and reusable recipes.

Brand Profile includes:

- Name, description, audience, tone, visual style, do/don't rules.
- Logo, fonts, colors.
- Caption, CTA, disclaimer defaults.
- Voice/provider defaults.
- Pronunciation dictionary.
- Entity dictionary.
- Source priority rules.
- Reference material and style reference videos.

Saved Recipes include:

- Name, Brand Profile, content mode, target preset, duration range, prompt/style instructions, source/search instructions, default voice/caption/music preferences.
- Daily/Trending Update recipe type with freshness window, story count, de-dup memory, source rules, and default structure.

## 4. DeepAgents Stage Graph

These stages are implemented as the DeepAgents guided stage graph. Rust persists state and enforces local safety boundaries but does not own a separate workflow engine.

Canonical stages:

1. FirstRunSetup.
2. BrandProfileSetup.
3. ProjectBrief.
4. ResearchAndSourceDiscovery.
5. ScriptDraft.
6. ScriptReview.
7. ScriptApproved.
8. MediaDiscoveryDownloadIndex.
9. VisualShotPlan.
10. VisualAssetsReview.
11. VisualAssetsApproved.
12. VoicePerformance.
13. TTSGeneration.
14. AudioCaptionMusicReview.
15. AudioCaptionMusicApproved.
16. RenderQueued.
17. Rendering.
18. PostRenderQA.
19. RenderReview.
20. FinalApproved.
21. FinalPackageExported.
22. CleanupProposed.
23. CleanupComplete.

Backward movement is allowed through chat. It creates new artifact versions and marks affected downstream artifacts stale.

## 5. Approvals

Formal persisted approval records:

1. Script approval.
2. Image generation approval.
3. Visual plan/selected assets approval.
4. Audio/captions/music approval.
5. Render marked final.
6. Cleanup approval.

Approval records include target type/id, decision, user note/instruction, timestamp, project/variation context, and relevant source/rights warning summary.

## 6. Data Model Areas

Initial schema should cover:

- Workspace and app settings.
- Provider connections and capabilities.
- Brand Profiles.
- Entity dictionary entries.
- Source priority rules.
- Reference materials and extracted chunks.
- Style references.
- Saved Content Recipes.
- Used-story memory.
- Projects and variations.
- Chat messages.
- DeepAgents runs, checkpoints, and stage runs.
- Tool/provider/child-process calls.
- Artifact events and state transitions.
- Script versions.
- Claim citations.
- Source references.
- Media assets.
- Media indexes.
- Asset usages.
- Image generation requests.
- Visual plans/scenes/shots.
- Voice performance versions.
- Audio generations.
- Caption sets.
- Remotion generated artifacts.
- Render inputs.
- Render recipes.
- Render attempts.
- QA reports.
- Metadata packages.
- Final packages.
- Cleanup plans.
- Approval records.

## 7. Local Storage Layout

Default visible workspace:

```txt
~/Hyogen/
  hyogen.sqlite
  backups/
  cache/
    runtimes/
      deepagents/
    provider-metadata/
  projects/
    {project_id}/
      manifest.json
      media/
      indexes/
      render_inputs/
      remotion/
      renders/
      final/
      traces/
      temp/
```

Project folders are inspectable and portable. SQLite is operational truth. Manifests are snapshots/import aids.

## 8. Managed Runtimes

MVP manages pinned versions of:

- DeepAgents runtime and its package environment.
- FFmpeg.
- FFprobe.
- yt-dlp.
- yt-dlp plugins required for reliable public YouTube downloads.
- Playwright/Chromium for fallback Google Images scraping.
- Node/Remotion runtime for generated graphic shots.

DeepAgents runs as a supervised local runtime/sidecar. Media tools run as traced child processes launched through the Rust boundary, with span IDs propagated into DeepAgents traces. Advanced overrides are allowed for developers.

## 9. UI Surfaces

MVP UI includes:

- First-run setup.
- Provider settings with capability checklist.
- Brand Profile settings.
- Recipe settings.
- Project dashboard.
- Studio: chat cards + read-only right-panel details.
- Media/source progress summaries with expandable trace detail.
- Approval cards.
- Preview frames/contact sheets.
- Audio preview.
- Render preview.
- Final package view.
- Trace viewer.
- Minimal command palette.

Creative edits are not manual UI controls. They are chat-mediated.

## 10. Local Verification

Verification must include DeepAgents harness contract tests for stage progression, approval interrupts, resume/retry/cancel, downstream invalidation, Rust bridge calls, credential redaction, and trace export.

Required local commands:

- `verify`: deterministic tests/evals with mocks and fixture assets.
- `eval-live`: live provider/search/media evals using configured keys.
- `build-local`: local desktop build.

Optional hooks:

- Pre-commit: format/lint quick checks.
- Pre-push: deterministic verify.

No GitHub CI/CD for MVP.

## 11. Open Questions Deferred

- Exact packaging strategy for signed/notarized public release.
- Exact DeepAgents runtime packaging/version pinning mechanism.
- Exact provider/model presets per capability.
- Exact Remotion sandbox enforcement mechanism.
- Exact local ASR/alignment provider choices.
- Exact permissive default font/SFX pack.
- Exact UI theme implementation details beyond the macOS dark/Tailwind direction.
