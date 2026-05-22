# hyogen.ai MVP Product Requirements Document

Fresh PRD generated from the product grilling session on 2026-05-16. This document supersedes all archived legacy docs.

## Problem Statement

Creators who want to make high-quality short-form videos currently have to coordinate too many separate tools: research, scripting, voiceover, footage search, image sourcing, captioning, motion graphics, rendering, QA, and export packaging. Traditional video editors expose timelines, tracks, keyframes, and manual media management that slow down non-editor creators. Existing AI video tools often hide the process, make weak generic videos, fail to preserve source attribution, or require users to bring all footage themselves.

The target user wants to act as a creative director, not as an editor. They want to describe an idea or run a repeatable content recipe, let agents research and source content, review major creative decisions, approve the result, and receive a high-quality vertical video package ready to publish manually to Shorts/Reels/TikTok-style platforms.

The MVP must be local-first and OSS-first. It should run as a real native macOS desktop app, store project assets and traces locally, use the user's own provider keys, and provide enough observability that humans and LLM coding agents can diagnose failures. It must not compromise on short-form quality: the first version can be narrow in product surface area, but the generated short must use the quality lessons from the existing F1.ai pipeline.

## Solution

hyogen.ai is an open-source, native macOS desktop app for agentic short-form video creation.

The MVP focuses on solo/prosumer creators with one to three Brand Profiles. When trade-offs conflict, the MVP optimizes for the Reference Creator: a solo/prosumer maker of faceless factual explainer/news shorts. It creates one short-form vertical video package at a time, using a DeepAgents-backed guided stage harness rather than a manual editing timeline. The user starts from a prompt, source URLs/files, or a Saved Content Recipe. hyogen researches the topic, drafts a script, waits for script approval, discovers/downloads relevant public media, indexes and validates selected visuals, creates a shot-level visual plan, generates segmented expressive TTS, aligns captions, renders a deterministic FFmpeg video with optional Remotion-generated charts/diagrams, runs post-render QA, and exports a final publish-ready package.

The app is chat-first for creative changes. Users can approve, reject, request changes, retry, cancel, preview, export, and clean up, but they do not manually edit scripts, scene choices, captions, metadata, or timelines. All creative revisions happen through chat instructions so the product remains agentic-first.

The MVP ships as source/local build first, then later as signed/notarized macOS releases. There is no license activation, no hosted backend, no cloud sync, no direct platform publishing, no telemetry, and no GitHub CI/CD requirement in MVP. Provider calls use BYOK credentials stored in macOS Keychain. Project state and traces remain local.

## User Stories

1. As a solo creator, I want to install and run a native macOS app, so that I can create videos without using a web SaaS editor.
2. As a solo creator, I want the app to be open source, so that I can inspect, trust, and contribute to the tool.
3. As a creator, I want to choose a visible local workspace folder, so that I can find my projects and final packages easily.
4. As a creator, I want my API keys stored in macOS Keychain, so that secrets are not written into project files or logs.
5. As a creator, I want to configure popular AI providers, so that I can use the models I already pay for.
6. As a creator, I want provider capabilities shown clearly, so that I know whether script writing, search, vision, TTS, image generation, and QA are ready.
7. As a creator, I want partial provider setup to be allowed, so that I can run degraded workflows when I understand the limitation.
8. As a creator, I want full agentic mode to require search/discovery capability, so that the agent can fill missing context and visuals.
9. As a creator, I want source-only mode to exist, so that I can intentionally restrict the app to my URLs and local files.
10. As a creator, I want a Brand Profile for every project, so that tone, visual style, logo, sources, voices, and defaults stay consistent.
11. As a creator, I want to quickly create a minimal Brand Profile, so that onboarding does not block my first project.
12. As a creator, I want Brand Profiles to store tone, audience, visual style, do/don't rules, logo, fonts, colors, caption defaults, and CTA defaults, so that videos feel consistent.
13. As a creator, I want Brand Profiles to store an entity dictionary, so that recurring people, products, teams, topics, colors, pronunciation, tags, source hints, and validation hints are reusable.
14. As a creator, I want the agent to suggest new Brand Profile entities, so that my style pack improves without silent mutation.
15. As a creator, I want to approve Brand Profile updates, so that the app never changes durable brand memory without my consent.
16. As a creator, I want Brand Profiles to store source priority rules, so that the agent searches the right places first.
17. As a creator, I want Brand Profiles to store disclaimer and rights metadata rules, so that final metadata follows my publishing style.
18. As a creator, I want to add style reference videos, so that the agent can learn pacing, captions, visual density, and tone from examples.
19. As a creator, I want style reference videos analyzed into summaries, so that the app learns style without directly copying assets.
20. As a creator, I want optional Saved Content Recipes, so that recurring formats like daily updates can be started quickly.
21. As a creator, I want a Daily/Trending Update recipe, so that I can manually create recurring niche news videos.
22. As a creator, I want used-story memory per Brand Profile and Recipe, so that daily videos do not repeat previously covered stories.
23. As a creator, I want to start a project from a prompt, source URL, local files, folder, previous variation, or recipe, so that the app fits my workflow.
24. As a creator, I want the agent to ask for missing high-level requirements before drafting, so that it does not write the wrong video.
25. As a creator, I want the app to research when the topic warrants it, so that I do not need to provide all context myself.
26. As a creator, I want provider-native search/grounding used when available, so that models can research like CLI coding agents do.
27. As a creator, I want hyogen to fetch/cache/materialize sources found by provider-native search, so that citations and media are reproducible.
28. As a creator, I want user-provided URLs and local media to work without OAuth, so that the MVP stays simple.
29. As a creator, I want YouTube search and download support, so that the agent can source useful video material.
30. As a creator, I want Google Images discovery as a fallback, so that the agent can find portraits, references, and still images when other sources fail.
31. As a creator, I want public media discovery to be automatic within the project intent, so that I am not asked permission for every search query.
32. As a creator, I want search/download progress summarized, so that I can trust what the agent is doing without reading raw logs.
33. As a creator, I want expandable trace detail for searches and downloads, so that I can debug bad sources.
34. As a creator, I want the app to download relevant media candidates before final visual planning, so that the agent can inspect real assets during feedback loops.
35. As a creator, I want the agent to decide relevance without artificial media budgets, so that quality is not constrained by arbitrary caps.
36. As a creator, I want downloads to stop once visual coverage is sufficient, so that the app avoids pointless tail downloads.
37. As a creator, I want only public media supported in MVP, so that the app does not require login or private account flows.
38. As a creator, I want a one-time rights/terms risk acknowledgement, so that I understand I am responsible for public media usage.
39. As a creator, I want rights labels on selected media, so that I know whether an asset is user-provided, generated, free-to-use, likely public domain, fair-use candidate, unknown, or needs review.
40. As a creator, I want the app to warn but not block unknown/fair-use assets, so that I can take responsibility for my offline tool usage.
41. As a creator, I want image files normalized before use, so that WebP-as-JPG, PNG-as-JPG, HEIC, and tiny images do not break rendering.
42. As a creator, I want selected images to meet quality thresholds or trigger replacement, so that final videos do not look low resolution.
43. As a creator, I want downloaded media indexed locally, so that the agent can reason over thumbnails, keyframes, transcripts, OCR, metadata, and visual descriptions.
44. As a creator, I want media indexing to happen incrementally as downloads finish, so that the workflow does not wait unnecessarily.
45. As a creator, I want cloud vision models used when configured and useful, so that media selection and QA can be accurate.
46. As a creator, I want the UI to disclose when selected frames/transcripts are sent to a provider, so that I understand privacy tradeoffs.
47. As a creator, I want script drafting to use Brand Profile, recipe, references, sources, and content mode, so that narration fits my channel.
48. As a creator, I want the first seconds of every social short to have a strong hook, so that viewers do not swipe away.
49. As a creator, I want scripts to avoid generic intros, so that the video starts with intrigue.
50. As a creator, I want scripts to use narrative tension, concrete imagery, varied pacing, and the “so what?” test, so that content feels high quality.
51. As a creator, I want factual videos to show claim citation status, so that I can judge trustworthiness.
52. As a creator, I want opinion, fiction, promo, and educational modes to have different citation expectations, so that the tool fits different content types.
53. As a creator, I want claim verification to be advisory, so that creative or opinion videos are not blocked.
54. As a creator, I want to approve the script before visual planning, so that the direction is stable before media work begins.
55. As a creator, I want script revisions to happen only through chat, so that the tool stays agentic-first.
56. As a creator, I want every meaningful script change to create a new version, so that history is preserved.
57. As a creator, I want script changes to invalidate downstream artifacts, so that stale visuals/audio/renders are not treated as current.
58. As a creator, I want existing indexed media reused when still relevant after script changes, so that revisions do not redownload unnecessarily.
59. As a creator, I want minimal creative variations, so that I can try another hook or tone without managing technical branches.
60. As a creator, I want variations to share the project media pool, so that alternate versions can reuse relevant assets.
61. As a creator, I want each short planned at shot-level granularity, so that one scene can contain multiple visuals.
62. As a creator, I want shot plans to use text cues, so that visuals line up with specific narration phrases.
63. As a creator, I want text cues mapped to real word timings when available, so that final shot timing follows the actual voiceover.
64. As a creator, I want no static image to hold too long, so that shorts stay visually engaging.
65. As a creator, I want one named entity or concept to generally receive its own shot, so that visuals match narration.
66. As a creator, I want selected media validated against the shot intent, so that wrong people, teams, products, places, or clips are caught before render.
67. As a creator, I want video clips validated using extracted frames from the actual selected range, so that thumbnail mismatches do not fool the agent.
68. As a creator, I want adaptive frame validation, so that longer clips are checked more thoroughly than very short clips.
69. As a creator, I want preview frames/contact sheets shown in review, so that I can approve visual intent without manually editing.
70. As a creator, I want visual and asset changes to happen through chat, so that I do not become a manual editor.
71. As a creator, I want visual approval to cover selected shots/assets and rights warnings, so that rendering is explicitly authorized.
72. As a creator, I want image generation available for missing visuals, so that weak media discovery does not block the video.
73. As a creator, I want image generation explicitly approved before spend/usage, so that paid/limited provider calls are controlled.
74. As a creator, I want generated images indexed and validated like other media, so that they fit the visual plan.
75. As a creator, I want Remotion-generated charts, diagrams, data cards, and visual explainers, so that abstract or technical concepts can be shown professionally.
76. As a creator, I want the agent to generate Remotion content from requirements, so that graphics are not limited to static templates.
77. As a creator, I want Remotion code generation sandboxed, so that arbitrary generated code cannot access the internet or my filesystem.
78. As a creator, I want Remotion outputs validated with preview frames, so that generated graphics match the approved visual intent.
79. As a creator, I want Remotion graphics to respect caption safe regions, so that captions remain readable.
80. As a creator, I want simple quote overlays, text cards, logo shots, and generated backgrounds, so that the app has fallback visuals.
81. As a creator, I want color grading presets, so that visuals can match the tone without manual editing.
82. As a creator, I want transitions and optional subtle SFX, so that videos feel polished.
83. As a creator, I want the source video audio muted by default, so that narration stays clear.
84. As a creator, I want narration and quote overlays instead of source-audio quote insertion in MVP, so that timing and rights stay simple.
85. As a creator, I want segmented TTS generation, so that audio can be cached, retried, and aligned like the proven F1.ai workflow.
86. As a creator, I want expressive TTS through SSML-compatible voice performance, so that narration sounds authentic.
87. As a creator, I want the canonical script stored separately from voice performance markup, so that script approval stays human-readable.
88. As a creator, I want a provider-agnostic Voice Performance IR, so that emotion, pace, pitch, pauses, emphasis, and pronunciation can compile to different TTS providers.
89. As a creator, I want Gemini and ElevenLabs-style expressive voice support, so that I can choose realistic delivery.
90. As a creator, I want pronunciation overrides, so that names and niche terms sound correct.
91. As a creator, I want the agent to flag pronunciation risks, so that I can correct likely mistakes before or after preview.
92. As a creator, I want audio preview approval, so that I approve what is actually spoken rather than raw SSML.
93. As a creator, I want segment audio cached by content hash, voice, provider, settings, and pronunciation dictionary, so that unchanged segments are reused safely.
94. As a creator, I want speech speed configurable by content mode and recipe, so that news can be punchy and stories can breathe.
95. As a creator, I want background music from local or public/free sources, so that the short has energy without AI music generation.
96. As a creator, I want voice, music, and SFX automatically mixed, normalized, ducked, and checked, so that audio sounds professional without a mixer.
97. As a creator, I want captions generated from voiceover alignment, so that burned captions match real timing and pauses.
98. As a creator, I want burned-in captions by default, so that Shorts/Reels/TikTok-style exports look right everywhere.
99. As a creator, I want SRT sidecar captions included too, so that the package is reusable.
100. As a creator, I want a few caption presets, so that I can choose clean, viral word-by-word, bold social, or minimal styles without a full editor.
101. As a creator, I want captions to use word timestamps when available, so that word-by-word captions are accurate.
102. As a creator, I want final scene and shot timings aligned to the generated audio, so that visuals follow actual speech.
103. As a creator, I want conceptual visual plan approval before audio and timing adjustment after audio, so that approval remains practical.
104. As a creator, I want FFmpeg rendering with 1080x1920, 30fps, H.264 MP4, AAC audio, and faststart, so that output is social-compatible.
105. As a creator, I want VideoToolbox acceleration on Apple Silicon with CPU fallback, so that renders are fast and reliable.
106. As a creator, I want 16:9 footage composed into 9:16 using blur-pad or safe crop/fit, so that horizontal clips look polished.
107. As a creator, I want final renders to include captions, logo overlays, music, SFX, color grades, and transitions, so that the result is publish-ready.
108. As a creator, I want post-render technical QA, so that broken files, wrong aspect ratio, missing audio, black frames, silence, and sync issues are caught.
109. As a creator, I want post-render AI QA, so that script/visual/caption/brand mismatches are flagged before final approval.
110. As a creator, I want Gemini vision/video QA available, so that rendered shorts can be checked accurately when configured.
111. As a creator, I want QA warnings to be advisory except for technical failures, so that I can accept creative/legal risk knowingly.
112. As a creator, I want to mark a render final only after QA and preview, so that I explicitly choose the final package.
113. As a creator, I want final package export to include video, metadata, captions, manifest, source attribution, claim citations, and QA report, so that I can publish manually with context.
114. As a creator, I want platform presets for YouTube Shorts, Instagram Reels, TikTok, and generic vertical, so that metadata and safe zones match my target.
115. As a creator, I want one target preset per project/variation in MVP, so that output complexity stays manageable.
116. As a creator, I want to duplicate a variation for another platform preset, so that I can adapt manually without multi-output complexity.
117. As a creator, I want generated titles, descriptions, hashtags, disclaimers, and credits based on Brand Profile, entities, recipe, platform preset, and sources, so that publishing metadata is ready to copy.
118. As a creator, I want metadata revisions through chat only, so that the agent owns creative text changes.
119. As a creator, I want final package exports stored in the project folder and optionally copied elsewhere, so that local truth and external sharing both work.
120. As a creator, I want cleanup to delete unused/rejected/temp assets only after approval, so that I can reclaim disk space without surprise deletion.
121. As a creator, I want used normalized render inputs kept by default, so that final renders remain reproducible.
122. As a creator, I want raw full downloads deleted after cleanup unless I opt to keep them, so that projects do not grow unnecessarily.
123. As a creator, I want archive/delete for Brand Profiles and Projects, so that I can manage my workspace.
124. As a creator, I want project delete to be permanent only after explicit confirmation, so that destructive actions are intentional.
125. As a creator, I want minimal project import/relink from folder manifests, so that project folders remain portable.
126. As a creator, I want a simple dashboard of Brand Profiles and Projects, so that I can resume work easily.
127. As a creator, I want a minimal command palette, so that I can quickly start projects, open settings, view traces, cancel jobs, retry stages, export packages, and open folders.
128. As a creator, I want one heavy job active at a time, so that downloads, TTS, renders, and QA do not overload my Mac or providers.
129. As a creator, I want long-running jobs cancellable, so that I can stop bad downloads/renders without corrupting state.
130. As a creator, I want partial artifacts retained until cleanup after cancellation, so that failures can be debugged.
131. As a creator, I want full local traces and prompt/response logs, so that I or an LLM coding agent can diagnose failures.
132. As a creator, I want no automatic telemetry or log upload, so that my private content stays local.
133. As a creator, I want secrets redacted from traces and debug bundles, so that sharing diagnostics does not leak API keys.
134. As a creator, I want safe and full debug bundle export modes, so that I can choose how much private context to share.
135. As a developer, I want a built-in trace viewer, so that I can inspect stages, tool calls, provider calls, artifacts, errors, and raw JSON without digging through files.
136. As a developer, I want optional Phoenix integration, so that deeper observability is available without making it a normal-user dependency.
137. As a developer, I want all external tools run as managed child processes with structured logs, so that FFmpeg, FFprobe, yt-dlp, Playwright/Chromium, and Remotion failures are diagnosable.
138. As a developer, I want managed runtime versions pinned and logged, so that bugs are reproducible.
139. As a developer, I want local deterministic mocks for tests only, so that verification does not spend provider credits.
140. As a developer, I want no user-facing demo/mock mode, so that product quality is judged with real providers.
141. As a developer, I want local verify/eval commands and optional Git hooks, so that quality is enforced without GitHub CI/CD.
142. As a contributor, I want a fresh PRD and implementation spec, so that legacy scope does not confuse future agents.

## Implementation Decisions

- MVP ICP is solo/prosumer creators managing one to three Brand Profiles. The Reference Creator is a solo/prosumer maker of faceless factual explainer/news shorts, and the Reference Workflow is the MVP quality bar. Agency/multi-account concepts can exist structurally later, but the MVP UX is not agency-first.
- MVP output is short-form vertical only: 9:16, 15–180 seconds, default 60–90 seconds, 1080×1920, 30fps, H.264 MP4, AAC audio.
- The canonical video type is a faceless vertical explainer/story/news short with AI voiceover, sourced/generated visuals, captions, music, optional SFX, and final local package export.
- The app is OSS-first under AGPL-3.0. There is no trial, license activation, render lock, hosted backend, telemetry, or cloud sync in MVP.
- Distribution starts with source/local builds. Signed/notarized macOS releases can come after the workflow is usable. Auto-update is out of MVP.
- Official MVP platform is macOS Apple Silicon. Intel Mac is best-effort. Windows/Linux are deferred.
- Stack is Tauri 2, Rust core, managed DeepAgents runtime, React, TypeScript, Vite, Tailwind. Rust owns the native desktop boundary, workspace/SQLite persistence APIs, Keychain access, filesystem policy, child-process supervision, trace ingestion, and cleanup. DeepAgents owns the guided agent/stage harness, workflow transitions, tool orchestration, and model/provider calls.
- The frontend sends user intents and renders state. It does not orchestrate stages or mutate workflow state directly.
- Tauri API should be small and intent/event based: DeepAgents runtime health, chat message, approve, request changes, cancel, retry, mark final, cleanup, read queries, progress events, trace events, artifact events, stage changes, and errors.
- Workspace default is a visible local folder named `~/Hyogen`, configurable on first run. SQLite lives at workspace root. Projects are local folder bundles with project-local media, indexes, renders, final packages, traces, and temp files.
- SQLite is the operational source of truth. Project manifests are portable snapshots/checkpoints and can be used for minimal import/relink.
- Existing legacy root docs are archived. Fresh root docs become the product/engineering source of truth.
- Provider credentials are stored in macOS Keychain. SQLite stores only credential references and non-secret configuration. Secrets are never written to manifests, traces, logs, or debug bundles.
- Provider configuration is capability-based by stage: text LLM, research/summarization, provider-native search/grounding, vision/image, vision/video/keyframe, final QA, TTS plain, TTS SSML/emotion, image generation, local model, OpenAI-compatible endpoint.
- Popular providers are in MVP scope: OpenAI, OpenAI-compatible APIs, OpenRouter, Anthropic, Gemini, Ollama, and ElevenLabs. Ollama/local is best-effort/degraded rather than a guaranteed full workflow path.
- OpenRouter is treated as an OpenAI-compatible provider with routing/model metadata.
- Provider capabilities use presets, API detection where available, and manual override. Traces record the actual provider/model used.
- BYOK provider calls are made through DeepAgents provider/tool adapters using secrets brokered from macOS Keychain by Rust. A managed DeepAgents runtime/sidecar is an MVP dependency; Rust supervises lifecycle, cancellation, log redaction, and local resource access.
- Provider-native search/grounding is preferred where available. Hyogen also provides explicit search/fetch/download tools for reproducibility.
- Any source found by provider-native search must be materialized by hyogen before use. If hyogen cannot fetch it, it is marked as an unverified provider citation.
- No OAuth-heavy integrations in first MVP. Direct publishing, Drive/Notion/Reddit/X auth, TikTok/Instagram/YouTube upload, and analytics ingestion are deferred.
- Full Agentic Mode requires search/discovery capability. Source-Only Mode is explicit and degraded.
- Public media discovery supports user URLs, local files/folders, YouTube search/download, provider/search leads, public/free media APIs, Google Images scraping fallback, and generated images after approval.
- Private, account-gated, or login-required media is out of MVP. The app should report auth-required/unavailable and ask for another source.
- hyogen bundles/manages the DeepAgents runtime plus FFmpeg/FFprobe, yt-dlp, yt-dlp plugins needed for reliable YouTube downloads, Playwright/Chromium for fallback image scraping, and Remotion/Node runtime for generated graphics.
- Managed runtimes are pinned per app release, versioned in traces, and overrideable in advanced settings.
- yt-dlp plugin management is in MVP; cookies/login/browser auth workflows are not.
- Google Images scraping is a fallback source. It should prefer original source/image URLs over thumbnails, throttle requests, cache candidate metadata, mark rights as unknown unless explicit, and fail gracefully on captcha/blocking.
- Public media rights policy prioritizes creative freedom with warnings. The app labels rights conservatively, requires selected-asset approval, includes source/rights reports, and never claims legal clearance.
- Rights acknowledgement is one-time global before first media discovery, with contextual warnings on selected assets and final package reports.
- Media discovery downloads relevant candidates into a project media pool, not every possible result and not only after user selection. The agent can stop/cancel queued downloads once every shot has sufficient coverage.
- No artificial project media budget is imposed. OS/disk failures are handled as errors, not product caps.
- Media indexing is local-first and incremental. The app creates metadata, thumbnails/contact sheets, keyframes, scene/shot boundaries where practical, audio extracts/transcripts where practical, OCR where practical, visual descriptions, tags, and source/rights metadata.
- Cloud multimodal models can inspect selected frames/transcripts when configured and useful. The UI labels provider use clearly.
- User-provided local files are referenced during exploration. Used/approved render inputs are copied/snapshotted into project storage for reproducibility.
- Downloaded web assets are project-local in MVP. No global media dedupe/DAM is required.
- Asset files use internal stable IDs on disk; original names, source URLs, content hashes, MIME/type, dimensions, attribution, and rights labels live in metadata.
- Images are MIME-detected and normalized before render use. Low-resolution images trigger self-repair/warnings; very tiny images are rejected unless explicitly approved.
- Source video downloads are capped by default to quality useful for 1080×1920 output, usually 1080p, with higher resolution only when vertical crop/quality needs it.
- Approved media becomes immutable normalized render inputs: clipped/cropped videos, normalized images, generated images, rendered Remotion graphics, and other render-ready assets.
- Keep normalized/clipped media used in final renders by default. Raw full downloads can be deleted during cleanup unless user opts to retain raw sources.
- Final export package includes final MP4, metadata, captions, manifest, asset attribution, claim citations, and QA report. Used media can be included optionally in external exports.
- Product workflow is a guided DeepAgents stage graph with chat inside each stage, explicit approval interrupts/checkpoints, and deterministic persisted artifacts; it is not a freeform autonomous agent.
- Canonical stages: first-run setup, Brand/Profile setup, project brief/recipe, research/source discovery, script draft, script approval, media discovery/download/indexing, visual shot plan, visual/assets approval, voice performance/TTS/captions/music, render, post-render QA, mark final/export, cleanup.
- Chat can move the workflow backward. Backend invalidates downstream artifacts, creates new immutable versions, and preserves old history.
- Formal persisted approvals in MVP: script approval, image generation approval, visual plan/selected assets approval, audio/captions/music approval, render final approval, and cleanup approval.
- Rejection/needs-changes for creative stages strongly prompts for instructions and stores the instruction with the decision/trace.
- UI exposes state/action controls only: start, approve, reject/needs changes, retry, cancel, preview, mark final, export, open folder, cleanup, configure providers/settings. Creative changes happen via chat.
- Script edits are chat-only. No direct script text editor in MVP. Approved script remains clean and human-readable.
- Scripts are generated as immutable versions. Significant revisions create new versions.
- Visual plan is shot-level. Hierarchy is Script Segment → Visual Scene → Shots. Shots contain labels, text cues/script spans, source type, intended visual description, selected asset usage, timing, transition, motion/fit/crop, validation status, and rights label.
- The detailed shot list is generated after script approval. Script review can include high-level visual direction but not final shot assignments.
- Shot timing uses text cues mapped to actual word timestamps after TTS alignment. Proportional character timing is a fallback.
- Source types include video clip, image, generated image, generated background/text card, quote overlay, logo/brand asset, simple graphic, and Remotion-generated chart/diagram/data-viz shot.
- AI-generated video is deferred. AI-generated images are allowed after explicit approval.
- Remotion is used as a graphic/data-viz shot generator, not the whole-video renderer. FFmpeg remains the final assembler.
- Agent-generated Remotion code is allowed in a constrained sandbox using a provided scaffold/library, static checks, allowed packages, timeout/memory limits, no arbitrary network access, and no arbitrary filesystem access.
- Users approve visual/shot intent, not raw Remotion code. Code and render logs are inspectable in traces/dev mode.
- Remotion-generated shots are validated visually with preview frames and safe-region checks before final assembly.
- Main renderer is FFmpeg-first and deterministic. It supports image scenes, video clip scenes, generated/background scenes, trim ranges, crop/scale/blur-pad to 9:16, source audio muted by default, voiceover, music, SFX, burned captions, logo/text overlays, color grades, cuts/fades/wipes/whip-pan-style transitions, and MP4 export.
- The renderer should include F1.ai quality lessons: 30fps normalization, split-filter blur-pad for 16:9 footage in 9:16, re-encode during concat, no static image >6s, enough shots per entity/concept, hard cuts by default for fast shorts, and A/V duration checks.
- Source audio is muted by default. Voiceover dominates. Source-audio quote insertion is deferred; quotes are handled through narration or quote overlays.
- Background music supports local files and public/free discovery. AI music generation is out of scope.
- Audio pipeline normalizes voiceover, ducks music/SFX under voice, prevents clipping, fades music where needed, and performs basic silence/clipping/loudness QA.
- TTS is segmented like F1.ai. Segment audio is cached by content hash, voice performance, provider/model/voice/settings, pronunciation dictionary version, and speed/pacing settings.
- Voice Performance IR is provider-agnostic and based on SSML/W3C concepts where possible. It stores emotion, intensity, pace, pitch, pauses, emphasis, pronunciation overrides, and provider-specific compiled markup.
- The approved script is separate from voice performance markup. Users approve audio preview, not raw SSML.
- Pronunciation dictionaries exist at Brand/Profile and project levels. The agent flags likely risks and user corrections can update dictionaries with approval.
- Caption generation uses actual voiceover alignment with approved script as reference. Word timestamps are used when available; estimated timing is fallback. SRT sidecar is generated from the same caption set.
- Burned-in captions are default for short-form vertical. Sidecar captions are included. Caption presets are limited to clean, viral word-by-word, bold social, and minimal/lower-third-like styles.
- Final scene/shot timings are audio-aligned. Visual plan approval is conceptual before audio; timing alignment after audio does not require new approval unless visual/content changes materially.
- Brand logo overlay is supported. Thumbnail/cover workflow is out of MVP.
- Shorts Quality Rules engine is required. It checks hook strength, generic intros, why-care, one-entity-one-shot, static image hold length, visual variety, source validation, captions safe zone, CTA defaults, duration target, citations, and render readiness.
- Quality rules hard-block only technical impossibility or invalid render state. Creative/legal issues trigger agent self-repair and warnings; users can approve risk.
- Selected media validation is mandatory in full-quality workflow. If no vision provider is available, degraded mode can proceed with warnings.
- Validation skips thumbnail-based validation in MVP and uses extracted frames from actual selected clips/images. Clips use adaptive frame validation.
- Post-render QA has local technical checks, AI semantic checks on sampled evidence, and optional deep provider video QA where available.
- Final QA includes brand/style compliance: tone, CTA/disclaimer, logo requirements, caption style/safe margins, entity spelling/pronunciation signals, source rule deviations, and forbidden terms.
- Projects produce one target preset/package at a time in MVP. Platform presets exist for YouTube Shorts, Instagram Reels, TikTok, and generic vertical. Multi-output branching is deferred to variations.
- Metadata package generation uses Brand/Profile, entity dictionary, recipe, platform preset, source/rights/disclaimer rules, CTA/comment prompt, and generated-media disclosure preferences. Revisions are chat-only.
- Project delete permanently deletes app records/project folder after explicit confirmation. Provider connection delete removes the Keychain secret immediately.
- Archive hides Brand Profiles/Projects from default views. Complex trash/recovery is out of MVP.
- Cleanup approval is a formal persisted decision. Cleanup is project-aware across variations and deletes only assets unused by active/finalized variations and marked temp/rejected/unused.
- Meaningful generated artifacts are immutable versions: scripts, visual plans, shot plans, voice performance versions, audio generations, caption sets, render recipes/manifests, Remotion code artifacts, normalized render inputs, render attempts, QA reports, metadata packages, traces.
- Caches/transient artifacts can be overwritten when safe: thumbnails, proxies, temp downloads before indexing finalization, and progress state.
- Creative variations are minimal: duplicate/try another direction, compare high-level status/script/render preview, and preserve final history. No technical branch UI.
- Concurrency: multiple projects can exist, but only one heavy job runs at a time in MVP. Heavy jobs include media discovery/download/indexing, TTS, render, AI QA, Remotion renders.
- Long-running jobs are cancellable where safe. Cancelled jobs keep traces and partial artifacts until cleanup.
- Observability is first-class. DeepAgents is the canonical agent/stage harness for MVP; do not build a custom Rust harness. Store DeepAgents runs, stage runs, tool calls, provider calls, child process calls, artifact events, state transitions, model prompts/responses, errors, and redacted logs locally.
- Do not store or display hidden chain-of-thought. Store structured summaries, tool calls, model inputs/outputs, errors, source decisions, and state transitions.
- Full local prompt/response logs are stored by default with secret redaction and a Settings opt-out to metadata-only logs.
- Debug bundle export has safe and full modes. Nothing uploads automatically.
- Built-in trace viewer is part of MVP. Phoenix integration is optional developer/debug integration, not a normal-user dependency.
- DeepAgents and all external media/tool runtimes run under Rust supervision with command args redacted, stdout/stderr logs, exit codes, timeouts/cancel handling, artifact paths, and trace/span IDs.
- Strong eval/test harness is required locally, but GitHub CI/CD is ignored in MVP. GitHub is source hosting only.
- Product UX has no mock/demo mode. Test-only deterministic mocks exist for local automated verification.
- Optional Git hooks can run local checks pre-commit/pre-push, with normal bypass available.
- Implementation should start with a tracer-bullet vertical slice using real providers: DeepAgents runtime bootstrap, provider setup, prompt, script, script approval, segmented TTS, simple visual media/generated fallback, captions if feasible, FFmpeg render, final package, trace viewer. Discovery/indexing/validation/Remotion/QA are added in subsequent milestones while preserving architecture.

## Testing Decisions

- Tests should verify external behavior and stable contracts, not implementation details. Good tests assert state transitions, persisted artifacts, emitted events, validated schemas, generated manifests, command invocations, and user-visible outcomes.
- Required local verification should be deterministic and not spend provider credits by default.
- Use test-only mock providers for deterministic DeepAgents stage graph tests, schema validation, prompt/response parsing, render recipe generation, trace/redaction tests, and small FFmpeg smoke tests.
- No user-facing mock/demo mode should be exposed in the app.
- Live provider evals are separate local/manual/nightly-style commands. They exercise OpenAI, Anthropic, Gemini, ElevenLabs, OpenRouter/OpenAI-compatible endpoints, provider-native search, web discovery, image generation, TTS, vision validation, and final QA.
- Required local tests should cover the DeepAgents stage graph and Rust bridge: valid forward progression, backward changes, invalidation, retries, cancellation, stale artifact marking, approval gates, sidecar lifecycle, and cleanup decisions.
- Required local tests should cover SQLite migrations/schema constraints and project folder manifest import/relink behavior.
- Required local tests should cover provider capability resolution, Keychain credential references using test doubles, secret redaction, provider status, and missing-capability UX states.
- Required local tests should cover structured AI output validation: script objects, source candidates, claim citations, visual plans, shot specs, Voice Performance IR, caption sets, Remotion graphic specs, render recipes, metadata packages, QA reports, and cleanup plans.
- Required local tests should include malformed AI output fixtures and automatic repair attempts.
- Required local tests should cover Shorts Quality Rules: weak hooks, generic intros, long static image holds, missing CTA when default-on, too few shots for named entities, missing citations in factual mode, missing visuals, missing audio, and duration warnings.
- Required local tests should cover media ingestion behavior with fixture images/videos: MIME detection, WebP/PNG normalization, low-resolution warnings, stable IDs, hashes, thumbnail/contact-sheet generation, FFprobe metadata, and missing/corrupt file errors.
- Required local tests should cover download/search adapters with mocked results: provider-native source materialization, YouTube candidate selection, Google Images fallback parsing, unavailable/auth-required source states, rights labels, and trace output.
- Required local tests should cover yt-dlp/FFmpeg/Remotion child process wrappers using stub commands where practical: args redaction, stdout/stderr capture, timeout, cancellation, exit-code mapping, artifact events, and error summaries.
- Required local tests should include a tiny real FFmpeg render smoke test using fixture media to verify 9:16 output, codec, fps, duration, audio presence, captions overlay or sidecar, and manifest output.
- Required local tests should cover segmented TTS caching logic with content hashes so reordered segments do not attach wrong audio.
- Required local tests should cover shot/media reuse by semantic IDs and hashes, not fragile array indexes.
- Required local tests should cover caption alignment fallback logic and SRT generation from caption timing data.
- Required local tests should cover Remotion sandbox static checks with generated fixture components: allowed imports, forbidden network/filesystem patterns, props validation, render artifact registration, and failure repair traces.
- Required local tests should cover final package export contents: MP4, metadata, captions, manifest, source report, claim citations, QA report, optional used-media copy, and external export copy.
- Required local tests should cover archive/delete/cleanup behavior, including permanent project deletion confirmation, Keychain secret removal via test double, cleanup approval, project-aware cleanup across variations, and no surprise deletion of final used media.
- Required local tests should cover observability: stage traces, provider calls, prompt/response logs, no hidden chain-of-thought, secret redaction, safe/full debug bundle generation, trace viewer query data, and optional Phoenix export payload shape.
- Local commands should include a fast deterministic `verify`, a live-provider `eval-live`, and a local desktop `build-local` flow.
- Optional Git hooks should run formatting/linting quickly on commit and deterministic verification before push. No GitHub CI/CD is required for MVP.

## Out of Scope

- License activation, trials, paid license checks, render locks, or hosted billing.
- Cloud project syncing, hosted backend, collaboration, multiplayer, team approvals, or client portals.
- Direct publishing/upload to YouTube, TikTok, Instagram, RSS, Google Drive, or any other external destination.
- OAuth-heavy integrations including YouTube publishing, Google Drive sync, Notion sync, Reddit auth, Twitter/X auth, TikTok publishing, Instagram publishing, or analytics ingestion.
- Multi-platform outputs from one project in the MVP UX. One project/variation targets one vertical preset/package.
- Traditional drag-and-drop nonlinear editing timeline, manual clip trimming UI, manual script editor, manual scene editor, manual caption editor, manual metadata editor, or manual Remotion code editor.
- User-facing mock/demo mode.
- GitHub CI/CD or cloud build/release automation.
- Windows/Linux official support.
- 4K vertical export.
- Long-form horizontal videos, podcasts, carousels, thumbnails/covers, or full social media management dashboards.
- Scheduled/fully automated workflow runs or auto-publishing.
- Full workflow builder. MVP uses Saved Content Recipes.
- Full enterprise RAG/vector database system. MVP uses lightweight reference material and SQLite FTS/chunking.
- Custom Rust agent/stage harness for the MVP workflow.
- Aura or any agent runtime other than DeepAgents as a hard dependency.
- Gausian Native Editor as a hard dependency.
- AI video generation via Veo/Runway/Pika or similar.
- Voice cloning, uploaded voice samples, custom voice training, or consent workflows.
- Multi-speaker/dialogue TTS.
- Source-audio quote insertion from downloaded media.
- Advanced chart/diagram template marketplace or user-authored Remotion plugins.
- Browser login, cookie extraction, private/account-gated media download, or social password handling.
- App-managed restore/trash workflow after deletion.
- Automatic telemetry, analytics, crash upload, or log upload.

## Further Notes

- The MVP is intentionally narrow in product surface area but high in content quality. “Limited MVP” means fewer workflows and platforms, not low-quality generated shorts.
- F1.ai is reference prior art for short-form quality: segmented TTS, YouTube/Google media sourcing lessons, Gemini vision validation, blur-pad composition, 30fps normalization, caption styling, static image hold limits, one-entity-one-shot planning, post-render FFprobe checks, and creator-style script rules. hyogen should port the behavior and lessons, not depend on the Python code at runtime.
- Current docs/prototype files have been archived as legacy reference. The fresh PRD should be treated as product source of truth. A separate MVP implementation spec should be generated from this PRD for engineering agents.
- Issue tracker publication was not completed from this environment because no project issue tracker configuration or triage label vocabulary was available in the current repo context.
