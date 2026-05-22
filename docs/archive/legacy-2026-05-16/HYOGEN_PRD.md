# hyogen.ai Product Requirements Document

## 1. Product Summary

hyogen.ai is a native macOS desktop app that helps creators, agencies, and brands produce videos by directing AI agents through chat.

Instead of editing on a traditional timeline, the user describes the content they want, reviews each production step, approves agent outputs, and receives a finished video that can be published to social platforms.

The app should support the full content production workflow:

1. Research and source gathering.
2. Script generation.
3. Visual planning.
4. Asset discovery or selection.
5. Image generation when approved.
6. Voiceover and audio generation.
7. Captions.
8. Local rendering.
9. Preview.
10. Publishing to social platforms.

## 2. Target Users

### Primary Users

* Solo creators producing Shorts, Reels, TikToks, YouTube videos, or educational content.
* Agencies managing multiple client brands or channels.
* Small teams that want repeatable video production without hiring full-time editors.
* Creators who want agentic research workflows that pull from sources such as Reddit, Twitter/X, Notion, Drive, files, or other integrations.

### User Goals

* Create videos faster from an idea, brief, source folder, or recurring research workflow.
* Maintain consistent brand style across multiple channels and platforms.
* Avoid learning complex video editing tools.
* Keep project files, brand files, and media assets local where possible.
* Reuse workflows for recurring content formats.
* Publish final videos to the platforms where their audience lives.
* Track source links and attribution for assets used in a video.

## 3. Core Product Promise

hyogen.ai turns a content idea or research workflow into a publishable video.

The user acts like a creative director. The app acts like a production team that can research, write, plan visuals, gather assets, generate audio, render, and publish.

## 4. Product Principles

* **Chat-first creation:** The main workflow happens through conversation, not a manual timeline editor.
* **Approval at every major step:** Script, visual plan, assets, image generation, voiceover, render, and publishing all require user approval.
* **Local-first desktop workflow:** Users can work with local files and folders. Project data and generated media should be stored locally unless the user publishes or connects external services.
* **Brand consistency:** Channels remember brand style, tone, voices, sources, and production preferences.
* **Reusable workflows:** Users can create repeatable script generation and production workflows for recurring content.
* **Multi-platform output:** A project can produce outputs tailored for YouTube, TikTok, Instagram, and other social formats.
* **Simple for non-editors:** The UI should hide technical complexity and present decisions in plain language.
* **Transparent sourcing:** The app should track where assets and claims came from so users can cite or credit them.

## 5. MVP Scope

The MVP should include:

* Local desktop app experience.
* 14-day free trial and paid license activation.
* Global provider settings and connection tests, with support for multiple connections per provider and one default connection per provider.
* Channel/brand management.
* Format presets with sensible app defaults.
* Project creation and project history.
* Chat-based agent workspace.
* Script generation, revision, approval, and version history.
* User-defined script generation workflows that are manually triggered in MVP.
* A connector framework for popular research, storage, asset, publishing, AI, voice, and image providers.
* First-party connector coverage in MVP design for YouTube, Reddit, Twitter/X, Notion, Google Drive, local files/folders, URLs/web pages, RSS feeds, YouTube publishing, TikTok publishing, Instagram publishing, and major AI/voice/image providers.
* Internet asset discovery/download from sources such as YouTube, Reddit, Twitter/X, public URLs, and other supported public sources.
* Local asset selection from user-selected files or folders.
* Image generation with explicit approval before spend/usage.
* Scene-by-scene visual planning.
* Asset library with source and attribution metadata.
* Voiceover generation and preview.
* Background music selection from local folders or free-to-use sources.
* Caption generation for every video.
* Optional burned-in caption styling.
* Local rendering and in-app preview.
* Multiple platform outputs per project branch, such as YouTube long-form, YouTube Short, TikTok, and Instagram Reel.
* One final approved render per platform output, with multiple render attempts allowed.
* Publishing to YouTube, TikTok, and Instagram.
* Multiple connected publishing accounts per platform, suitable for agencies and multi-channel creators.
* First-class approval records for scripts, plans, assets, generated images, audio, renders, and publishing.
* Project duplication/branching in a non-technical UI.
* Archive and delete flows.

## 6. Out of Scope for MVP

The MVP should not include:

* A traditional drag-and-drop nonlinear editing timeline.
* Multiplayer collaboration.
* Cloud project syncing.
* Full social media management dashboards.
* Advanced manual editing comparable to Premiere Pro, Final Cut, or DaVinci Resolve.
* Complex analytics-driven content recommendations.
* Public template marketplace.
* Scheduled or fully automated workflow runs. Workflows are manually triggered in MVP.

## 7. Core Product Objects

This section defines product concepts clearly enough for ERD and design documents to be derived.

### 7.1 Workspace

A workspace represents the local app environment for the user. MVP can assume one local user and one local workspace.

The workspace contains:

* Global settings.
* Provider keys.
* Connected integrations.
* Channels.
* Projects.
* Local asset references.
* License/trial state.

### 7.2 Channel

A channel is a brand, creator identity, client, or publishing presence.

Examples:

* “F1 Insights”
* “Stoic Philosophy Shorts”
* “Client: SaaS Product Tutorials”
* “Personal Finance Explainers”

A channel should include:

* Name.
* Description.
* Logo or avatar.
* Brand colors.
* Font preferences.
* Visual style notes.
* Tone of voice.
* Target audience.
* Do/don't rules.
* Default content pillars/topics.
* Default source preferences.
* Default caption style.
* Default music preferences.
* Saved voices.
* Saved format presets.
* Reference material / knowledge base.
* Default publishing targets, where applicable.

A channel can have many projects, many saved voices, many format presets, many source workflows, many reference documents, and many default publishing targets.

### 7.3 Format Preset

A format preset defines how a video should be shaped for a platform or content style.

The app should ship with global defaults to reduce onboarding friction. Users should be able to copy and customize these defaults per channel.

Default format types:

* Short-form vertical.
* Long-form horizontal.
* Square/social feed.
* Custom.

A format preset should include:

* Name.
* Intended platforms.
* Target duration.
* Aspect ratio.
* Resolution/export quality.
* Pacing.
* Hook style.
* Script structure.
* Caption behavior.
* Caption style.
* Voice preference.
* Music preference.
* Intro/outro rules.
* Visual density.
* Call-to-action rules.
* Publishing metadata defaults.

### 7.4 Project

A project represents one content idea or production effort.

Projects are not limited to a single platform. A project may produce platform-specific outputs such as:

* YouTube long-form video.
* YouTube Short.
* Instagram Reel.
* TikTok video.

A project should include:

* Title.
* Description or original prompt.
* Current status.
* Associated channel.
* Selected primary format or output goal.
* Chat history.
* Script versions.
* Visual plans.
* Selected assets.
* Generated images.
* Voiceover/audio.
* Captions.
* Platform outputs.
* Render attempts for each platform output.
* One final approved render for each platform output on the active branch.
* Publishing records.
* Source and attribution records.

Project statuses should include:

* Draft.
* Researching.
* Script ready for review.
* Visual plan ready for review.
* Assets ready for review.
* Audio ready for review.
* Ready to render.
* Rendering.
* Rendered.
* Publishing.
* Published.
* Failed.
* Archived.

### 7.5 Project Branch

A project branch is a simple, user-friendly way to explore alternate creative directions.

This should feel like “Try another direction” or “Create variation,” not like a technical Git workflow.

Users should be able to:

* Duplicate a project into a new branch.
* Try a different script, angle, format, or style.
* Compare branches at a high level.
* Choose one branch as the final direction.
* Keep, archive, or delete branches.

Each branch can have its own script versions, visual plan, asset selections, platform outputs, render attempts, and final approved renders.

### 7.6 Script Version

Scripts should be stored separately from chat messages.

A script version represents a concrete draft or approved script.

It should include:

* Script text.
* Version number.
* Status: draft, needs revision, approved, rejected, archived.
* Notes from the user.
* Created timestamp.
* Source workflow or prompt that generated it.

Users should ask the agent to revise scripts rather than manually editing a complex script editor. The UI may allow lightweight inline comments or instructions, but the primary revision mechanism is chat.

### 7.7 Script Generation Workflow

A script generation workflow is a reusable research-and-writing recipe.

Example:

“When I run this workflow, pull the latest F1 discussion from selected Reddit communities and Twitter/X accounts, combine it with trusted motorsport news sources, identify the most interesting controversy, and write a 60-second script in my channel voice.”

A workflow can include:

* Name.
* Description.
* Channel association.
* Source integrations.
* Source rules.
* Extraction rules.
* Filtering rules.
* Writing instructions.
* Default format preset.
* Approval requirements.
* Last run status.

Supported source/integration categories should include:

* YouTube.
* Reddit.
* Twitter/X.
* Notion.
* Google Drive.
* Local files or folders.
* URLs and web pages.
* RSS feeds.
* Future MCP-style connectors.

Workflows are manually triggered in MVP. They should not run on a schedule and should not publish automatically. They should create drafts or project inputs that the user reviews.

### 7.8 Knowledge Base

A knowledge base is the saved reference material the agent can use when creating content for a channel or project.

It is not the same as the asset library.

Knowledge base material helps the AI understand facts, brand voice, product details, prior scripts, research notes, and style guidance.

Examples:

* Brand guidelines.
* Product briefs.
* Research PDFs.
* Client notes.
* Previous scripts.
* Tone-of-voice examples.
* Fact sheets.
* Competitor notes.

Knowledge base items can belong to:

* A channel, for reusable brand memory.
* A project, for project-specific research.
* A script workflow, for reusable source context.

Users should be able to:

* Upload documents.
* Link supported external sources.
* See processing status.
* See whether an item is ready for use.
* Delete or archive items.
* Understand what scope the item applies to.

Supported MVP file types should include:

* PDF.
* TXT.
* Markdown.
* DOCX.
* CSV.
* Images with readable text where supported.

### 7.9 Asset Library

The asset library stores or references media used in production.

This is different from the knowledge base. Assets are media that may appear in the final video or influence the visual plan.

Asset types:

* Video clips.
* Images.
* Generated images.
* Audio files.
* Music tracks.
* Logos.
* Captions/subtitle files.

Assets can come from:

* User-selected local files.
* User-selected local folders.
* YouTube clips.
* Reddit or other public sources.
* Free-to-use media libraries.
* Image generation providers.

Each asset should track:

* Name.
* Type.
* Source.
* Source URL, if applicable.
* Local file path, if applicable.
* Rights/license notes.
* Attribution text.
* Usage status.
* Associated project/branch.
* Whether the user approved it.

### 7.10 Visual Plan

A visual plan is the scene-by-scene production plan for a video.

It should include:

* Scene number.
* Script segment.
* Estimated timing.
* Visual description.
* Required asset type.
* Candidate assets.
* On-screen text.
* Caption notes.
* Lower-third notes.
* Transition notes.
* Approval status.

Users should be able to:

* Review the full plan.
* Approve or reject individual scenes.
* Ask the agent to revise scenes.
* Replace suggested assets.
* Approve the full visual plan before rendering.

### 7.11 Voice and Audio

The app should support multiple voice providers and saved voices.

MVP provider categories should include major providers such as:

* ElevenLabs.
* OpenAI TTS.
* Google TTS.
* Sarvam AI.
* Local or self-hosted providers where practical.

Users should be able to:

* Save multiple voices per channel.
* Set default voices per format.
* Preview generated voiceover before rendering.
* Regenerate voiceover after script changes.
* Select background music from local folders.
* Discover/download free-to-use music when available.
* Approve audio before rendering.

### 7.12 Captions

Captions should be generated for every video.

Users should be able to choose whether captions are:

* Exported as a separate caption/subtitle file.
* Burned into the video.
* Both.

If captions are burned into the video, users should be able to configure:

* Font.
* Size.
* Color.
* Background or highlight style.
* Position.
* Animation style, if available.
* Emphasis behavior.

Caption style defaults can come from the channel or format preset.

### 7.13 Platform Output, Render Attempt, and Final Output

A project branch can have multiple platform outputs. A platform output represents one deliverable tailored to a specific destination or format.

Example platform outputs for one project branch:

* YouTube long-form: 16:9, 7 minutes.
* YouTube Short: 9:16, 45 seconds.
* TikTok: 9:16, 35 seconds, different hook.
* Instagram Reel: 9:16, platform-specific caption/metadata.

Each platform output can have its own format preset, aspect ratio, captions, metadata, render attempts, publishing status, and final approved render.

Users may trigger multiple render attempts while refining a platform output.

However, each platform output should have one final approved render at a time.

A platform output should include:

* Target platform or destination.
* Format preset.
* Aspect ratio.
* Target duration.
* Platform-specific title/description/hashtags.
* Caption behavior.
* Publishing status.
* Final approved render, if available.

A render attempt should include:

* Status.
* Started timestamp.
* Completed timestamp.
* Output file path.
* Error summary, if failed.
* Whether it is marked as final.

Users should be able to:

* Re-render after changes.
* Preview successful renders.
* Mark a render as final.
* Locate the output file.
* Choose the output location.

Supported output formats should prioritize social upload compatibility, especially:

* MP4.
* MOV where needed.
* Platform-compatible caption files.

Supported aspect ratios should include common social formats:

* 9:16 vertical.
* 16:9 horizontal.
* 1:1 square.
* 4:5 portrait feed.

### 7.14 Publishing Account

A publishing account represents a connected account on a social platform.

Users should be able to connect multiple accounts per platform. This is required for agencies and creators who manage many brands.

Examples:

* YouTube account for “F1 Insights.”
* YouTube account for “Client A.”
* Instagram account for “F1 Insights.”
* TikTok account for “Personal Finance Shorts.”

Publishing accounts should include:

* Platform.
* Display name.
* Account/channel identifier.
* Connection status.
* Last connection test status.
* Token/authorization status.
* Optional channel association.

Channels should be able to define default publishing targets using connected publishing accounts.

### 7.15 Publishing Record

Publishing records track where a final platform output was published.

MVP platforms:

* YouTube.
* TikTok.
* Instagram.

Users should be able to:

* Connect publishing accounts.
* Select platform(s) for upload.
* Review generated title, description, hashtags, and attribution.
* Include source credits where needed.
* Publish after approval.
* See publish status.
* Retry failed publishing attempts.

Publishing should always require explicit user approval.

### 7.16 Approval Record

Approvals should be stored as first-class product records, not only implied by status fields.

An approval record captures a user decision about a specific item.

Approval records should support:

* Script approval or rejection.
* Visual plan approval or rejection.
* Scene-level approval or rejection.
* Asset approval or rejection.
* Image generation approval or rejection.
* Voiceover/audio approval or rejection.
* Render approval / mark as final.
* Publishing approval.

An approval record should include:

* Approved item type.
* Approved item identifier.
* Decision: approved, rejected, or needs changes.
* User note or instruction, if provided.
* Timestamp.
* Associated project, branch, and platform output where applicable.

## 8. Main User Workflows

### 8.1 First-Time Setup

The user should be able to:

1. Open the desktop app.
2. Start a 14-day free trial or enter a license key.
3. Add global provider keys.
4. Test provider connections.
5. Connect one or more publishing accounts per platform, if desired.
6. Choose folders for local assets and music, if desired.
7. Create the first channel.
8. Pick or customize default format presets.

After the trial ends, payment/license activation is required to continue using the product.

License validation requires internet access.

### 8.2 Create or Manage a Channel

The user should be able to:

1. Create a channel.
2. Add brand identity details.
3. Add saved voices.
4. Configure format presets.
5. Upload knowledge base documents.
6. Add source preferences.
7. Select default publishing targets from connected platform accounts.
8. Edit, archive, or delete the channel.

### 8.3 Create a Script Generation Workflow

The user should be able to:

1. Name the workflow.
2. Choose a channel.
3. Choose source integrations or local folders/files.
4. Define source rules.
5. Define extraction rules.
6. Define script style and format.
7. Run the workflow.
8. Review extracted research.
9. Approve generation of a script draft.

### 8.4 Start a Video Project

The user should be able to start from:

* A blank chat prompt.
* A script generation workflow.
* A local file or folder.
* A URL.
* A previous project branch.
* A manually provided content brief.

The user should then select:

* Channel.
* Desired output format/platform, or multiple platform outputs.
* Any relevant knowledge base items.
* Any local assets or folders to consider.

### 8.5 Script Drafting and Approval

The app should generate a script draft based on:

* User prompt.
* Channel settings.
* Format preset.
* Knowledge base.
* Workflow research.
* Source material.

The user should be able to:

* Read the draft in chat.
* Ask for revisions.
* Request alternate angles.
* Save multiple versions.
* Approve one version.
* Reject or archive versions.

Script approval is required before visual planning.

### 8.6 Visual Planning and Approval

After script approval, the app should create a scene-by-scene visual plan.

The user should be able to:

* Review each scene.
* See suggested visual direction.
* See needed assets.
* Approve/reject individual scenes.
* Ask the agent to revise scenes.
* Approve the full plan.

Visual plan approval is required before final asset preparation and rendering.

### 8.7 Asset Discovery, Selection, and Approval

The app should support both internet and local asset discovery.

Internet sources can include:

* YouTube.
* Reddit.
* Public URLs.
* Free-to-use media/music sources.
* Other supported integrations over time.

Local sources can include:

* Files selected by the user.
* Folders selected by the user.
* Channel asset folders.
* Project asset folders.

The user should be able to:

* Review candidate assets.
* See source and rights/attribution notes.
* Approve or reject assets.
* Replace assets.
* Ask the agent to find alternatives.

### 8.8 Image Generation Approval

Image generation should be available but must require explicit approval before usage.

The app should show:

* What image will be generated.
* Why it is needed.
* Which provider/model will be used, if relevant.
* Any estimated cost/usage warning when available.

The user should be able to approve, reject, or revise the image generation request.

### 8.9 Audio and Captions

The app should generate voiceover from the approved script.

The user should be able to:

* Select or confirm the voice.
* Preview the voiceover.
* Regenerate voiceover if needed.
* Select or approve background music.
* Confirm caption behavior.
* Choose caption style if captions are burned in.

Audio approval is required before rendering.

### 8.10 Render and Preview

Once script, visual plan, assets, images, audio, and captions are approved, the user can render.

During rendering, the UI should show:

* Current render stage.
* Progress percentage.
* Clean error messages if something fails.

After rendering, the user should be able to:

* Preview the video in the app.
* Re-render after changes.
* Mark the render as final.
* Locate the output file.
* Choose or change output location.

### 8.11 Publishing

After a final platform output is approved, the user should be able to publish.

The app should generate platform-specific metadata:

* Title.
* Description.
* Hashtags.
* Caption file, where supported.
* Attribution/source credits.

The user should be able to:

* Choose platform outputs and connected publishing accounts.
* Review platform-specific metadata.
* Edit metadata through chat instructions.
* Approve publishing.
* See publishing status.
* Retry failed uploads.

Publishing requires explicit approval.

### 8.12 Branching and Variations

The user should be able to create variations of a project.

Examples:

* “Try a more dramatic hook.”
* “Make a version for TikTok.”
* “Create a calmer documentary-style branch.”
* “Try an alternate conclusion.”

The UI should present this as simple creative branching, not technical version control.

## 9. Product Areas and Screen Requirements

### 9.1 Activation

Activation should allow users to:

* Start a 14-day free trial.
* Enter a license key.
* See license status.
* See trial days remaining.
* Understand when rendering/publishing is locked.
* Retry license validation.

### 9.2 Settings

Settings should allow users to manage:

* License key.
* AI provider keys.
* Voice provider keys.
* Image generation provider keys.
* Publishing account connections, including multiple accounts per platform.
* Local provider settings.
* Music folder location.
* Default asset folder locations.
* General app preferences.

Settings should include connection tests for provider keys and publishing accounts.

Provider credentials are global in MVP, not per-channel. Users should be able to store multiple connections for the same provider, such as multiple OpenAI, ElevenLabs, Google, or Sarvam connections, and choose one default connection per provider.

### 9.3 Channels

Channels should allow users to:

* Create, edit, archive, and delete channels.
* Define brand identity.
* Configure saved voices.
* Configure format presets.
* Upload knowledge base items.
* Configure source preferences.
* Manage default publishing targets using connected publishing accounts.

### 9.4 Workflows

Workflows should allow users to:

* Create reusable script generation workflows.
* Connect source inputs.
* Define extraction and writing rules.
* Run workflows.
* Review gathered research.
* Create a project or script draft from workflow output.

### 9.5 Studio

Studio is the main agentic creation workspace.

Recommended layout:

* Left sidebar: channels, projects, branches, workflow entry points.
* Center: chat and approval cards.
* Right panel: preview, project context, selected assets, render/publish status.

Studio should include:

* Chat with the agent.
* Current project and branch context.
* Script draft cards.
* Visual plan cards.
* Asset approval cards.
* Image generation approval cards.
* Voiceover preview cards.
* Caption style cards.
* Render progress.
* Video preview.
* Publishing status.
* Project history.

### 9.6 Asset Library

The asset library should allow users to:

* View project assets.
* View approved and rejected assets.
* See source URLs.
* See attribution/license notes.
* Add local files or folders.
* Remove assets from a project.
* Replace assets in a scene.

### 9.7 Command Palette

The app should support a global command palette following common agentic app conventions.

Users should be able to quickly:

* Navigate to settings.
* Create a new channel.
* Start a new project.
* Run a workflow.
* Create a branch/variation.
* Add assets.
* Start render when ready.
* Open publishing flow.
* Archive/delete allowed items.
* Search available actions.

Actions that interrupt active rendering or publishing should be disabled while those processes are running.

## 10. Approval Gates

The app must require and record user approval before:

* Running paid or limited image generation.
* Accepting a script as final for planning.
* Accepting a visual plan for production.
* Downloading or using assets where approval is needed.
* Using generated voiceover.
* Rendering.
* Marking a render as final.
* Publishing to any platform.

Each approval decision should create an approval record so agents, ERD designers, and UI designers can trace what was approved, rejected, or requested for revision.

## 11. Error Handling Requirements

The app should explain failures in plain language and tell the user what to do next.

Examples:

* Invalid API key: direct the user to Settings and offer a provider connection test.
* Internet failure during asset lookup: explain that the network connection should be checked and allow retry.
* Source unavailable: show which source failed and suggest alternatives.
* Image generation failed or limit reached: explain and let the user skip, retry, or choose another provider.
* Rendering failed: show a clean failure state and a short explanation, with an option to retry or adjust the plan.
* Publishing failed: show platform-specific status and allow retry.
* AI produced an invalid plan: attempt automatic correction before asking the user to intervene.

The app should avoid silent failures and stuck loading states.

Raw technical logs do not need to be displayed directly in the UI. The UI should show understandable summaries.

## 12. Platform and Output Requirements

### Publishing Platforms

MVP should support publishing to:

* YouTube.
* TikTok.
* Instagram.

### Output Formats

The app should support social-compatible export formats, especially:

* MP4.
* MOV where required.
* Caption/subtitle files where supported by the target platform.

### Aspect Ratios

The app should support common social aspect ratios:

* 9:16 vertical.
* 16:9 horizontal.
* 1:1 square.
* 4:5 portrait feed.

### Captions

Captions should always be generated. Burned-in captions are optional and controlled by the user or format preset.

## 13. Final Modeling Decisions for ERD and Design

This section removes ambiguity for agents creating ERD, UX, and design documents.

### 13.1 Official Project Hierarchy

The official project hierarchy is:

`Project → Project Branch → Platform Output → Render Attempt → Final Approved Render`

Example:

* Project: “Ferrari race strategy breakdown.”
* Branch: “Dramatic hook version.”
* Platform outputs:
  * YouTube long-form.
  * YouTube Short.
  * TikTok.
  * Instagram Reel.
* Each platform output can have multiple render attempts.
* Each platform output can have only one final approved render at a time.

### 13.2 Connector Priority

ERD and design documents should model a connector framework, not one-off hardcoded integrations.

MVP design should include first-party connector coverage for:

* YouTube.
* Reddit.
* Twitter/X.
* Notion.
* Google Drive.
* Local files and folders.
* URLs and web pages.
* RSS feeds.
* YouTube publishing.
* TikTok publishing.
* Instagram publishing.
* Major AI providers.
* Major voice/TTS providers.
* Major image generation providers.

Future MCP-style connectors should be represented as an extensible connector category.

### 13.3 Knowledge Base Linking

A knowledge base item should be stored once and linkable to multiple scopes.

Example: one brand guidelines PDF can be linked to:

* A channel.
* Multiple projects.
* A script generation workflow.

Design and ERD documents should support many-to-many linking between knowledge base items and the scopes that use them.

### 13.4 Asset Rights and Attribution

For MVP, the app should track source URL, source platform, attribution text, and license/rights notes, but final responsibility for usage rights remains with the user.

The app may warn users when rights are unknown, but it should not block asset usage solely because rights cannot be automatically verified.

### 13.5 Provider Credentials

Provider credentials are global workspace-level records.

Users should be able to store multiple connections for the same provider and select one default connection per provider.

Examples:

* Two OpenAI API keys.
* Multiple ElevenLabs accounts.
* Multiple Google connections.
* Multiple image generation provider connections.

Provider credentials are separate from publishing accounts.

### 13.6 Script Editing Model

Users should primarily revise scripts by giving instructions to the agent.

The app should not require a full manual screenplay editor in MVP.

Allowed MVP interactions:

* Ask the agent to rewrite the script.
* Add comments or revision instructions.
* Request alternate hooks, sections, tones, or endings.
* Generate a new script version from the requested changes.

Each meaningful revision should create a new script version.

### 13.7 Archive, Delete, and Local Files

Archive hides records from primary views without deleting them.

Delete removes the app record after explicit confirmation.

If an item points to a local media file, deleting the app record should not automatically delete the local file unless the user separately confirms file deletion.

### 13.8 Render History

Render attempts should be preserved by default.

When a new render is marked final, older render attempts should remain available in render history unless the user manually deletes them.

Only one render attempt can be marked final for a platform output at a time.

## 14. Archive and Delete Behavior

Users should be able to archive or delete:

* Channels.
* Projects.
* Branches.
* Script versions.
* Knowledge base items.
* Assets.
* Workflows.

Archive should hide items from primary views without permanently deleting them.

Delete should be treated as destructive and require confirmation. For records tied to local files, deleting the app record should not delete the local file unless the user separately confirms that action.

## 15. Success Criteria

The MVP is successful when a user can:

1. Start a trial or activate the product.
2. Configure provider keys and test them.
3. Create a channel with brand preferences.
4. Create or choose a format preset.
5. Upload knowledge base material.
6. Create a script generation workflow or start from a prompt.
7. Generate and revise a script.
8. Approve the script.
9. Review and approve a scene-by-scene visual plan.
10. Discover or select assets.
11. Approve image generation if needed.
12. Generate and preview voiceover.
13. Generate captions.
14. Render a video locally.
15. Preview the result inside the app.
16. Mark one render as final.
17. Publish to at least one supported platform.
18. Reuse the same channel/workflow settings for another video.

## 16. Future Opportunities

Potential future additions:

* Batch generation for agencies.
* Advanced approval workflows for teams.
* Template marketplace for video styles.
* More direct MCP connector marketplace support.
* Voice cloning workflows.
* Analytics-informed content suggestions.
* Cloud backup as an optional paid feature.
* Collaboration and client review portals.
