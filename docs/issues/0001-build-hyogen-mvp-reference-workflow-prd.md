---
title: Build the hyogen.ai MVP Reference Workflow
labels:
  - ready-for-agent
status: ready-for-agent
type: prd
issue_url: https://github.com/abhay-kumar/hyogen.ai/issues/1
---

## Problem Statement

Creators who want high-quality short-form vertical videos must currently coordinate research, sourcing, scripting, voiceover, captions, motion graphics, rendering, QA, metadata, rights reporting, and final packaging across many separate tools. Traditional video editors force Creators into manual timelines, tracks, trims, keyframes, and file management. Many AI video tools go the other direction: they hide the process, produce generic outputs, lose source attribution, or require Creators to bring all footage themselves.

The MVP needs to prove a better path for the Reference Creator: a solo/prosumer maker of faceless factual explainer or news shorts. That Creator wants to direct creative intent, approve risk-bearing decisions, and receive a publish-ready Final Package, without becoming a manual editor or trusting an opaque hosted service with private creative material, provider logs, credentials, or local media.

## Solution

Build hyogen.ai as an open-source, local-first macOS desktop app that delivers one excellent Reference Workflow for a Faceless Factual Short.

The Creator chooses a local Workspace, configures Provider Connections using their own keys, creates a minimal Brand Profile, starts a Project from a prompt or sources, and guides a DeepAgents-backed Guided Workflow through research, script drafting, Approval Gates, media discovery, visual planning, Voice Performance, TTS, Caption Sets, deterministic rendering, QA, metadata, source attribution, citations, and Final Package export.

The product remains chat-first. The Creator can approve, reject, request changes, retry, cancel, preview, mark final, export, open folders, and clean up, but creative changes to scripts, visuals, captions, timing, and metadata happen through chat rather than direct manual editors. DeepAgents owns the Guided Workflow. Rust owns the local boundary: persistence, credentials, filesystem access, child-process supervision, redaction, trace ingestion, cleanup, and local safety.

MVP success is not a broad feature matrix. Success is one excellent Reference Workflow that produces a 1080x1920 MP4 with burned captions, SRT, metadata, attribution, claim citations where relevant, QA report, final local package, and inspectable Run Traces.

## User Stories

1. As a Reference Creator, I want to create a Faceless Factual Short from a prompt, so that I can turn an idea into a publish-ready package without operating a timeline.
2. As a Reference Creator, I want to create a Project from source URLs, so that I can constrain the video to material I already trust.
3. As a Reference Creator, I want to create a Project from local files or folders, so that I can use my own media and reference material.
4. As a Reference Creator, I want a visible local Workspace, so that I can inspect my Projects, media, traces, and Final Packages.
5. As a Reference Creator, I want the app to be local-first, so that my creative material and provider logs stay on my Mac.
6. As a Reference Creator, I want to use my own provider keys, so that I can choose the services and models I pay for.
7. As a Reference Creator, I want credentials stored securely outside project files, so that secrets are not leaked through manifests, traces, or debug bundles.
8. As a Reference Creator, I want clear Provider Capability status, so that I know whether research, search, vision, TTS, image generation, and QA are available.
9. As a Reference Creator, I want partial provider setup to be allowed, so that I can run degraded workflows intentionally.
10. As a Reference Creator, I want Full Agentic Mode to require discovery capability, so that the app does not pretend to research without sources.
11. As a Reference Creator, I want Source-Only Mode, so that I can intentionally restrict the Project to my provided material.
12. As a Reference Creator, I want the degraded mode clearly labeled, so that I understand quality and citation limitations.
13. As a Reference Creator, I want a minimal Brand Profile, so that onboarding does not block the first Project.
14. As a Reference Creator, I want Brand Profiles to store audience, tone, visual style, disclaimers, caption defaults, CTA defaults, and source rules, so that repeated Projects feel consistent.
15. As a Reference Creator, I want Brand Profiles to store pronunciation and entity dictionaries, so that recurring names, products, and topics are handled correctly.
16. As a Reference Creator, I want Brand Profile updates to require approval, so that durable channel memory does not silently mutate.
17. As a Reference Creator, I want Saved Content Recipes, so that recurring formats can start quickly.
18. As a Reference Creator, I want a Daily or Trending Update recipe, so that recurring news-style videos can avoid repeating stories.
19. As a Reference Creator, I want used-story memory, so that repeated recipe runs do not cover the same item unintentionally.
20. As a Reference Creator, I want the app to ask for missing high-level requirements before drafting, so that it does not write the wrong video.
21. As a Reference Creator, I want research to happen when the topic warrants it, so that factual shorts do not rely only on model memory.
22. As a Reference Creator, I want provider-native search to produce Discovery Leads only, so that search results are not mistaken for verified evidence.
23. As a Reference Creator, I want Discovery Leads materialized into Source Material before final use, so that claims and attribution are reproducible.
24. As a Reference Creator, I want unmaterialized provider citations labeled as unverified, so that I can judge whether to trust them.
25. As a Reference Creator, I want public web sources fetched and cached locally, so that the final package can explain where facts came from.
26. As a Reference Creator, I want YouTube discovery and public download support, so that relevant visual material can be considered.
27. As a Reference Creator, I want Google Images discovery as a fallback, so that portraits, references, and still images can be found when better sources are unavailable.
28. As a Reference Creator, I want public/free media APIs considered, so that lower-risk visuals are preferred when available.
29. As a Reference Creator, I want private or login-gated media excluded from MVP, so that the app avoids credential-heavy account flows.
30. As a Reference Creator, I want source and download progress summarized, so that I can trust what the app is doing without reading raw logs.
31. As a Reference Creator, I want expandable trace detail for searches and downloads, so that I can debug poor source choices.
32. As a Reference Creator, I want media discovery to stop once visual coverage is sufficient, so that the app avoids pointless tail downloads.
33. As a Reference Creator, I want no artificial media budget, so that quality is constrained by relevance and disk errors rather than arbitrary caps.
34. As a Reference Creator, I want rights risk acknowledged once globally, so that I understand I am responsible for public media usage.
35. As a Reference Creator, I want Rights Labels on Selected Media, so that I can approve usage risk knowingly.
36. As a Reference Creator, I want unknown and fair-use candidates to warn but not always block, so that a local creative tool remains practical.
37. As a Reference Creator, I want conservative source attribution reports, so that final publishing context is not lost.
38. As a Reference Creator, I want user-provided local files referenced during exploration, so that large personal folders do not get copied unnecessarily.
39. As a Reference Creator, I want used local media snapshotted as Render Inputs, so that final renders remain reproducible.
40. As a Reference Creator, I want downloaded media stored project-locally, so that each Project is inspectable and portable.
41. As a Reference Creator, I want images MIME-detected and normalized, so that WebP-as-JPG, PNG-as-JPG, HEIC, and tiny images do not break rendering.
42. As a Reference Creator, I want low-resolution media flagged, so that final videos do not look poor.
43. As a Reference Creator, I want corrupt or missing media reported clearly, so that failures are diagnosable.
44. As a Reference Creator, I want downloaded media indexed incrementally, so that downstream work can start before every candidate finishes.
45. As a Reference Creator, I want media indexing to include thumbnails, keyframes, contact sheets, transcripts where practical, OCR where practical, tags, and visual descriptions, so that hyogen can plan shots from real evidence.
46. As a Reference Creator, I want cloud vision use disclosed, so that I know when frames or transcripts are sent to a provider.
47. As a Reference Creator, I want script drafting to use my Brand Profile, recipe, sources, and content mode, so that narration fits my channel.
48. As a Reference Creator, I want a strong hook in the first seconds, so that viewers do not swipe away.
49. As a Reference Creator, I want scripts to avoid generic intros, so that the video begins with intrigue.
50. As a Reference Creator, I want scripts to use narrative tension and the “so what?” test, so that factual videos feel worth watching.
51. As a Reference Creator, I want factual claims to have citation status, so that I can judge trustworthiness.
52. As a Reference Creator, I want citation requirements to vary by content mode, so that opinion, fiction, promo, and education are not treated like factual news.
53. As a Reference Creator, I want claim verification to be advisory except where rendering is impossible, so that creative judgment remains mine.
54. As a Reference Creator, I want script approval before visual planning, so that media work starts from a stable direction.
55. As a Reference Creator, I want script revisions through chat only, so that the product remains agentic-first.
56. As a Reference Creator, I want every meaningful script revision saved as an Artifact Version, so that history is preserved.
57. As a Reference Creator, I want downstream artifacts marked stale after script changes, so that old visuals, audio, captions, and renders are not treated as current.
58. As a Reference Creator, I want still-relevant indexed media reused after revisions, so that the app does not redownload unnecessarily.
59. As a Reference Creator, I want minimal Variations, so that I can try another hook or tone without managing technical branches.
60. As a Reference Creator, I want Variations to share the media pool, so that alternate directions can reuse relevant material.
61. As a Reference Creator, I want a shot-level Visual Plan, so that each important phrase or concept has appropriate visual coverage.
62. As a Reference Creator, I want Script Segments, Visual Scenes, and Shots to be distinct, so that narration, visual beats, and clip-level choices do not get conflated.
63. As a Reference Creator, I want Shots tied to text cues, so that visuals line up with specific narration phrases.
64. As a Reference Creator, I want shot timing aligned to actual word timestamps when available, so that visuals follow the final voiceover.
65. As a Reference Creator, I want proportional timing fallback, so that rendering can proceed when exact word timestamps are unavailable.
66. As a Reference Creator, I want no static image held too long, so that shorts stay visually engaging.
67. As a Reference Creator, I want one named entity or concept generally represented by its own Shot, so that visuals match narration.
68. As a Reference Creator, I want Selected Media validated against Shot intent, so that wrong people, products, teams, places, or clips are caught.
69. As a Reference Creator, I want video clips validated from actual selected ranges, so that thumbnails do not mislead the planner.
70. As a Reference Creator, I want preview frames and contact sheets, so that I can approve visual intent without editing manually.
71. As a Reference Creator, I want visual changes through chat, so that I do not become a manual editor.
72. As a Reference Creator, I want visual approval to include selected assets and rights warnings, so that rendering is explicitly authorized.
73. As a Reference Creator, I want image generation available for missing visuals, so that weak source discovery does not block the Project.
74. As a Reference Creator, I want image generation explicitly approved before provider spend, so that limited or paid calls are controlled.
75. As a Reference Creator, I want generated images indexed and validated like other media, so that they fit the Visual Plan.
76. As a Reference Creator, I want Fallback Visuals, so that a basic Project can render when media coverage is weak.
77. As a Reference Creator, I want Remotion-generated charts, diagrams, quote cards, and data visuals, so that abstract concepts can be shown professionally.
78. As a Reference Creator, I want generated Remotion shots sandboxed, so that generated code cannot access arbitrary network or filesystem resources.
79. As a Reference Creator, I want Remotion outputs validated with preview frames, so that generated graphics match the approved intent.
80. As a Reference Creator, I want Remotion graphics to respect caption safe regions, so that captions remain readable.
81. As a Reference Creator, I want FFmpeg to be the final assembler, so that rendering is deterministic and media-oriented.
82. As a Reference Creator, I want 1080x1920, 30fps, H.264 MP4, AAC audio, and faststart output, so that the video is social-compatible.
83. As a Reference Creator, I want horizontal footage composed into vertical output with safe crop, fit, or blur-pad, so that 16:9 media looks polished.
84. As a Reference Creator, I want source audio muted by default, so that narration stays clear.
85. As a Reference Creator, I want narration or quote overlays instead of source-audio quote insertion in MVP, so that timing and rights stay simpler.
86. As a Reference Creator, I want segmented TTS generation, so that audio can be cached, retried, and aligned safely.
87. As a Reference Creator, I want expressive Voice Performance separate from the approved script, so that human-readable script approval is not polluted by provider markup.
88. As a Reference Creator, I want provider-agnostic Voice Performance, so that emotion, intensity, pace, pitch, pauses, emphasis, and pronunciation can compile to different TTS providers.
89. As a Reference Creator, I want pronunciation risks flagged, so that niche names and terms can be corrected.
90. As a Reference Creator, I want pronunciation corrections to update dictionaries with approval, so that future Projects improve safely.
91. As a Reference Creator, I want audio preview approval, so that I approve what is actually spoken.
92. As a Reference Creator, I want TTS caching by content, voice, provider, settings, dictionary, and pacing, so that unchanged segments are reused safely.
93. As a Reference Creator, I want background music from local or public/free sources, so that shorts have energy without AI music generation.
94. As a Reference Creator, I want voice, music, and SFX normalized, ducked, and checked, so that audio sounds professional.
95. As a Reference Creator, I want captions generated from voiceover alignment, so that burned captions match actual speech.
96. As a Reference Creator, I want burned captions by default, so that the Final Package looks right on short-form platforms.
97. As a Reference Creator, I want SRT sidecars included, so that the package is reusable.
98. As a Reference Creator, I want a small set of caption presets, so that I can choose style without a caption editor.
99. As a Reference Creator, I want caption safe zones checked, so that text is readable on social platforms.
100. As a Reference Creator, I want conceptual visual approval before audio, so that I do not need to approve exact timings prematurely.
101. As a Reference Creator, I want timing adjustments after audio not to require reapproval unless creative content changes materially, so that the workflow stays practical.
102. As a Reference Creator, I want post-render technical QA, so that broken files, wrong aspect ratio, missing audio, black frames, silence, clipping, and sync issues are caught.
103. As a Reference Creator, I want post-render semantic QA, so that script, visual, caption, brand, and source mismatches are flagged.
104. As a Reference Creator, I want QA Findings to distinguish blockers from warnings, so that technical impossibility stops rendering but creative/legal risks remain approvable.
105. As a Reference Creator, I want agent self-repair for fixable Quality Findings, so that the app improves output before asking me to accept risk.
106. As a Reference Creator, I want to mark a render final only after preview and QA, so that I explicitly choose the Final Package.
107. As a Reference Creator, I want metadata generated from Brand Profile, recipe, platform preset, source reports, disclaimers, and CTA defaults, so that publishing text is ready to copy.
108. As a Reference Creator, I want metadata revisions through chat only, so that metadata stays part of the agentic workflow.
109. As a Reference Creator, I want one target preset per Project or Variation, so that MVP output complexity stays manageable.
110. As a Reference Creator, I want to duplicate a Variation for another platform preset, so that platform adaptation is possible without multi-output complexity.
111. As a Reference Creator, I want Final Packages to include MP4, metadata, captions, manifest, source attribution, claim citations, and QA report, so that I can publish manually with context.
112. As a Reference Creator, I want optional used-media inclusion in external exports, so that I can share a complete package when needed.
113. As a Reference Creator, I want cleanup to require approval, so that disk space can be reclaimed without surprise deletion.
114. As a Reference Creator, I want normalized Render Inputs kept by default, so that final renders remain reproducible.
115. As a Reference Creator, I want raw full downloads removable after cleanup, so that Projects do not grow unnecessarily.
116. As a Reference Creator, I want archive and delete for Projects and Brand Profiles, so that I can manage the Workspace.
117. As a Reference Creator, I want project deletion to require explicit confirmation, so that destructive actions are intentional.
118. As a Reference Creator, I want minimal import or relink from project manifests, so that project folders remain portable.
119. As a Reference Creator, I want one heavy job active at a time, so that downloads, TTS, rendering, and QA do not overload my Mac or provider accounts.
120. As a Reference Creator, I want long-running jobs cancellable, so that I can stop bad downloads or renders without corrupting state.
121. As a Reference Creator, I want cancelled jobs to retain traces and partial artifacts until cleanup, so that failures can be diagnosed.
122. As a Reference Creator, I want a dashboard of Brand Profiles and Projects, so that I can resume work easily.
123. As a Reference Creator, I want a Studio surface with chat cards and read-only details, so that I can guide the workflow without manual editors.
124. As a Reference Creator, I want approval cards, previews, contact sheets, audio previews, render previews, final package views, and trace views, so that major decisions are understandable.
125. As a Reference Creator, I want a minimal command palette, so that common actions are easy to access.
126. As a developer, I want DeepAgents to own the Guided Workflow, so that agentic orchestration is not duplicated in Rust.
127. As a developer, I want Rust to own the local boundary, so that persistence, credentials, filesystem access, process supervision, redaction, and trace ingestion are safe and testable.
128. As a developer, I want a small intent/event API, so that the frontend stays thin and does not orchestrate workflow state.
129. As a developer, I want SQLite to be operational truth, so that state queries, recovery, and consistency checks are reliable.
130. As a developer, I want project folders and manifests to remain inspectable, so that Creators and agents can diagnose and move Projects.
131. As a developer, I want Run Traces to include stages, tool calls, provider calls, child processes, artifact events, transitions, model inputs and outputs, errors, and redacted logs, so that failures can be diagnosed locally.
132. As a developer, I want hidden chain-of-thought excluded from traces, so that observability does not depend on storing private reasoning.
133. As a developer, I want safe and full debug bundle exports, so that different sharing-risk levels are supported.
134. As a developer, I want no automatic telemetry or log upload, so that the local-first trust model is preserved.
135. As a developer, I want managed runtime versions pinned and logged, so that bugs are reproducible.
136. As a developer, I want external tools run as supervised child processes, so that FFmpeg, FFprobe, yt-dlp, Playwright, Chromium, Node, and Remotion failures are diagnosable.
137. As a developer, I want deterministic local verification with mocks, so that tests do not spend provider credits by default.
138. As a developer, I want separate live provider evals, so that real provider/search/media behavior can be checked intentionally.
139. As a developer, I want a local desktop build command, so that contributors can verify the app end-to-end without cloud CI.
140. As a contributor, I want source-of-truth docs that reflect the Reference Workflow, so that implementation agents do not optimize for the wrong scope.

## Implementation Decisions

- Build the MVP around the Reference Workflow for a Reference Creator making a Faceless Factual Short. Broader content modes may exist as structural options, but they must not dilute quality of this path.
- Deep module: App Shell and Intent/Event API. The frontend sends user intents and renders projected state; it does not own stage orchestration or mutate workflow state directly.
- Deep module: Workspace and Project Store. It manages Workspace selection, Brand Profiles, Projects, Variations, Artifact Versions, approvals, manifests, archive/delete, import/relink, and cleanup state.
- Deep module: Credential Manager. It stores raw secrets in the native credential store, persists only credential references, brokers scoped secret access, supports test doubles, and redacts traces and bundles.
- Deep module: Provider Capability Registry and Adapters. It models Provider Connections by capability rather than by provider-specific workflow branches, resolves capability readiness, calls providers through brokered credentials, validates outputs, and records actual provider/model usage.
- Deep module: DeepAgents Guided Workflow. It owns canonical stage transitions, Approval Gates, retries, cancellation, backward movement, downstream invalidation, and tool/provider orchestration.
- Deep module: Artifact and Approval Service. It preserves immutable meaningful outputs, records formal decisions, associates instructions and rights warnings with approvals, and marks stale downstream artifacts after changes.
- Deep module: Run Trace and Observability Store. It records stage runs, tool calls, provider calls, child process calls, artifact events, state transitions, model inputs/outputs, error summaries, redacted logs, and debug bundle material.
- Deep module: Source Materialization and Public Media Discovery. It converts Discovery Leads into Source Material, fetches user URLs, handles public search/download flows, rejects private/login-gated media, tracks rights metadata, and reports unverified leads.
- Deep module: Media Pool, Ingestion, and Indexing. It stores project-local Media Candidates, normalizes files, computes stable IDs and hashes, generates thumbnails/contact sheets/keyframes, probes audio/video, extracts transcripts/OCR where practical, tags media, and prepares Selected Media for planning.
- Deep module: Script and Citation Engine. It drafts and revises scripts using Brand Profile, recipe, Source Material, and content mode; extracts claims; records citation status; and produces clean human-readable Artifact Versions.
- Deep module: Shorts Quality Rules Engine. It evaluates hooks, generic intros, why-care, duration, static hold length, one-entity-one-shot coverage, missing citations, media quality, selected-media confidence, caption safe zones, CTA defaults, and render readiness.
- Deep module: Visual Planner and Media Validation. It maps approved scripts into Script Segments, Visual Scenes, and Shots; assigns text cues; selects assets; validates Selected Media against Shot intent; and prepares conceptual plans for approval.
- Deep module: Voice Performance and TTS Pipeline. It stores provider-agnostic Voice Performance separately from clean scripts, compiles to provider-specific formats, generates segmented TTS, caches safely, previews audio, and tracks pronunciation risks.
- Deep module: Caption and Alignment Engine. It aligns approved script text to generated audio, uses word timestamps when available, falls back to estimated timings, produces Caption Sets, burned-caption timing data, and SRT sidecars.
- Deep module: Remotion Graphic Shot Generator. It turns approved graphic-shot specs into sandboxed generated shots, enforces allowed dependencies and no arbitrary network/filesystem access, validates output visually, and registers immutable rendered media.
- Deep module: FFmpeg Render Compiler and Renderer. It compiles approved shot plans, Render Inputs, audio, captions, overlays, transitions, music, and metadata into deterministic final render attempts.
- Deep module: QA Engine. It runs technical checks, semantic checks, brand/style checks, source/citation checks, and optional deeper provider QA; it returns Quality Findings with severity, repairability, and suggested fixes.
- Deep module: Final Package Exporter. It freezes final renders and packages MP4, metadata, captions, manifest, asset attribution, claim citations, QA reports, and optional used media.
- Deep module: Cleanup and Retention Planner. It proposes project-aware cleanup across Variations, retains final-used normalized inputs by default, deletes raw unused/rejected/temp material only after approval, and records cleanup decisions.
- UI surfaces remain thin over deep modules: first-run setup, provider settings, Brand Profile settings, recipe settings, dashboard, Studio, approval cards, preview/contact sheet views, audio preview, render preview, final package view, trace viewer, and command palette.
- The MVP stack is a native macOS app with Rust/Tauri, React/TypeScript UI, managed DeepAgents runtime, managed media/tool runtimes, local SQLite persistence, and BYOK providers.
- SQLite is operational truth. Project folders and manifests are inspectable portability/relink aids rather than the source of all state.
- The app is local-first and open-source-first with no hosted backend, telemetry, license activation, render lock, cloud sync, or direct publishing in the MVP.
- Distribution starts with source/local builds. Signed and notarized public releases are deferred until the workflow is usable.
- Official MVP platform is macOS Apple Silicon. Intel Mac is best-effort; Windows and Linux are deferred.
- Popular Provider Connections are in scope: OpenAI, OpenAI-compatible APIs, OpenRouter, Anthropic, Gemini, Ollama/local best-effort, and ElevenLabs.
- Capability categories include text LLM, research/summarization, provider-native search or grounding, vision/image, vision/video/keyframe, final QA, plain TTS, expressive TTS, image generation, and local model support.
- OpenRouter is treated as an OpenAI-compatible provider with routing/model metadata.
- Provider-native search is preferred where useful, but its results are Discovery Leads until materialized.
- Full Agentic Mode requires search/discovery capability. Source-Only Mode is explicit and degraded.
- Public media discovery supports user URLs, local files/folders, public YouTube search/download, provider/search leads, public/free media APIs, Google Images fallback, and generated images after approval.
- Private, account-gated, browser-login, cookie extraction, and OAuth-heavy media flows are out of MVP.
- Rights policy is conservative labels and warnings, not license clearance. Unknown/fair-use candidates can proceed with explicit approval.
- Media discovery downloads relevant candidates before final visual planning so the app can inspect actual assets during feedback loops.
- Approved media becomes immutable Render Inputs for reproducibility.
- The Guided Workflow is stage-based and uses explicit Approval Gates for script approval, image generation approval, visual/asset approval, audio/caption/music approval, final render approval, and cleanup approval.
- Chat can move the workflow backward. Meaningful backward changes create new Artifact Versions and mark affected downstream artifacts stale.
- Creative changes are chat-only. Direct manual script, timeline, caption, scene, metadata, and Remotion code editors are excluded from MVP.
- The detailed Visual Plan is generated after script approval. Script review can include high-level visual direction but not final shot assignments.
- Visual planning hierarchy is Script Segment to Visual Scene to Shot.
- Shot timing starts with text cues and is refined after audio alignment.
- Source types include video clip, image, generated image, generated background/text card, quote overlay, logo/brand asset, simple graphic, and Remotion-generated graphic shot.
- AI-generated video is out of scope. AI-generated images are allowed after explicit approval.
- Remotion is a graphic/data-viz shot generator, not the whole-video renderer.
- FFmpeg is the final assembler and implements 1080x1920, 30fps, H.264 MP4, AAC audio, faststart, crop/fit/blur-pad, source audio muted by default, voiceover, music, SFX, burned captions, overlays, color grades, and simple transitions.
- Voice Performance is provider-agnostic and separate from clean script text. Creators approve audio preview rather than raw SSML or provider markup.
- Caption Sets are generated from actual voiceover alignment where possible and produce both burned captions and SRT sidecars.
- QA hard-blocks technical impossibility and invalid render state. Creative, citation, brand, and rights issues are warnings or self-repair prompts unless the Creator chooses to accept them.
- Final Packages include the final MP4, metadata, captions, manifest, asset attribution, claim citations where relevant, QA report, and optional normalized used media.
- One Project or Variation targets one platform preset/package in MVP. Multi-output branching is handled by duplicating Variations.
- Concurrency is intentionally simple: only one heavy job runs at a time. Heavy jobs include media discovery/download/indexing, TTS, render, AI QA, and Remotion rendering.
- Long-running jobs are cancellable where safe. Partial artifacts and traces remain until approved cleanup.
- Observability is a first-class MVP feature. Run Traces and trace viewer are required for users, developers, and future implementation agents.
- Hidden chain-of-thought is neither stored nor displayed. Structured summaries, tool calls, inputs/outputs, decisions, state transitions, and errors are stored.

## Testing Decisions

- Good tests assert external behavior and stable contracts: state transitions, persisted artifacts, emitted events, schema validation, redaction, provider capability resolution, generated manifests, command invocations, final package contents, and user-visible outcomes.
- Tests should avoid implementation details such as internal function boundaries or UI component structure unless those details are the public contract of a deep module.
- There is no implementation test prior art yet; the existing source-of-truth docs define expected behavior. The first implementation should establish deterministic local verification patterns before broad feature work.
- Required deterministic tests should not spend provider credits or depend on live external services by default.
- Test the DeepAgents Guided Workflow with mock providers for forward progression, approval interrupts, retries, cancellation, resume, backward movement, downstream invalidation, stale artifact marking, and one-heavy-job policy.
- Test the Rust boundary contract for credential brokerage, filesystem policy, child-process supervision, cancellation, stdout/stderr capture, args redaction, trace ingestion, and cleanup protection.
- Test the Workspace and Project Store for SQLite constraints, migrations, stable IDs, Artifact Versions, Approval Gates, project manifests, import/relink, archive/delete, and cleanup decisions.
- Test the Credential Manager with test doubles for create/read/delete references, scoped secret brokerage, provider deletion, trace redaction, safe debug bundle output, and full debug bundle behavior.
- Test the Provider Capability Registry for preset capabilities, detected capabilities where possible, manual override, missing capability UX states, degraded modes, actual provider/model trace recording, and OpenAI-compatible/OpenRouter handling.
- Test structured AI output validation and repair for scripts, claim citations, source candidates, Visual Plans, Shot specs, Voice Performance, Caption Sets, Remotion graphic specs, render recipes, metadata packages, QA reports, and cleanup plans.
- Test Source Materialization and Public Media Discovery with mocked search/download results, unavailable sources, auth-required sources, provider-native lead materialization, Google Images fallback parsing, YouTube candidate selection, rights labels, and trace output.
- Test Media Pool/Ingestion/Indexing with fixture images and videos for MIME detection, normalization, low-resolution warnings, corrupt files, hashes, stable IDs, thumbnails, contact sheets, FFprobe metadata, OCR/transcript fallbacks where feasible, and missing files.
- Test Script and Citation Engine for hook strength, generic intro rejection, factual claim extraction, citation status, advisory verification, source-only constraints, Brand Profile application, and revision versioning.
- Test Shorts Quality Rules for weak hooks, missing why-care, long static image holds, missing CTA when default-on, too few Shots for named entities, missing citations in factual mode, missing visuals, missing audio, unsafe captions, and duration warnings.
- Test Visual Planner and Media Validation for Script Segment to Shot mapping, text cue preservation, selected asset validation, actual clip-range frame extraction, fallback visual selection, rights warning propagation, and visual approval summaries.
- Test Voice Performance and TTS for clean script separation, provider compilation, pronunciation override use, segmented caching keys, retry behavior, mismatched cache protection, audio preview artifact creation, and dictionary update approvals.
- Test Caption and Alignment Engine for word-timestamp alignment, estimated fallback, SRT generation, caption preset output, safe-zone warnings, and audio-aligned shot timing updates.
- Test Remotion Graphic Shot Generator for sandbox static checks, allowed imports, forbidden network/filesystem patterns, props validation, timeout/memory/cancel handling, preview frame generation, repair traces, and immutable media registration.
- Test FFmpeg Render Compiler and Renderer with a tiny real smoke render that verifies 9:16 output, codec, fps, duration, audio presence, caption overlay or sidecar generation, manifest consistency, and relevant logs.
- Test QA Engine for local technical checks, semantic QA input preparation, brand/style checks, citation/report checks, severity mapping, self-repair suggestions, and optional deep provider QA payload shape.
- Test Final Package Exporter for required contents, optional used-media copying, metadata revisions, manifest consistency, source attribution, claim citations, QA report inclusion, and external copy behavior.
- Test Cleanup and Retention Planner for cleanup approval, project-aware retention across Variations, no deletion of final-used Render Inputs, raw download deletion options, temp/rejected/unused deletion, and permanent project delete confirmation.
- Test Observability and Trace Viewer data contracts for stage traces, provider calls, prompt/response logs, redacted logs, no hidden chain-of-thought, artifact events, errors, safe/full debug bundle generation, and optional Phoenix export shape.
- Provide a fast deterministic verification command for mocks and fixtures.
- Provide a live-provider eval command for OpenAI, Anthropic, Gemini, ElevenLabs, OpenRouter/OpenAI-compatible endpoints, provider-native search, image generation, TTS, vision validation, and final QA.
- Provide a local desktop build command.
- Optional Git hooks may run formatting/linting quickly on commit and deterministic verification before push, but cloud CI is not required for MVP.

## Out of Scope

- License activation, paid trials, render locks, hosted billing, or a hosted backend.
- Automatic telemetry, analytics, crash upload, or log upload.
- Cloud project sync, collaboration, multiplayer, client portals, or team approvals.
- Direct publishing or upload to YouTube, TikTok, Instagram, Google Drive, Notion, Reddit, X, or other platforms.
- OAuth-heavy integrations, browser login, cookie extraction, private/account-gated media download, or social password handling.
- Windows and Linux official support.
- Full signed/notarized public release and auto-update.
- 4K export, horizontal long-form videos, podcasts, carousels, thumbnails/covers, or social media management dashboards.
- Multi-platform output from one Project in the MVP UX.
- Traditional nonlinear editing timeline, manual clip trimming UI, manual script editor, manual scene editor, manual caption editor, manual metadata editor, or manual Remotion code editor.
- User-facing mock/demo mode.
- GitHub CI/CD or cloud build/release automation.
- Full workflow builder; Saved Content Recipes are the MVP reuse mechanism.
- Full enterprise RAG/vector database system.
- Custom Rust agent/stage harness for the Guided Workflow.
- Any hard dependency on an agent runtime other than DeepAgents.
- AI video generation.
- Voice cloning, uploaded voice samples, custom voice training, or consent workflows.
- Multi-speaker/dialogue TTS.
- Source-audio quote insertion from downloaded media.
- Advanced chart/diagram template marketplace or user-authored Remotion plugins.
- App-managed restore/trash workflow after deletion.
- Agency-first account management or multi-channel/team workflows.

## Further Notes

- The current repository is planning/docs-only. Implementation has not started.
- This PRD reflects the sharpened MVP decisions from the grill session: optimize for the Reference Workflow, keep creative control chat-first, let DeepAgents own orchestration, keep Rust as the local boundary, use FFmpeg for final assembly, use Remotion only for graphic shots, keep SQLite as operational truth, and treat public media rights as warnings rather than legal clearance.
- Existing ADRs should be treated as constraints for implementation planning.
- If an external issue tracker is later configured, this PRD should be copied into it with the `ready-for-agent` triage label.
