# hyogen.ai Design Document

This document defines the UX, UI architecture, interaction patterns, and visual system for hyogen.ai.

It is derived from:

* `HYOGEN_PRD.md` — product source of truth.
* `HYOGEN_ERD.md` — data model and relationship source of truth.

The design goal is to make a complex agentic video-production system feel like a simple native macOS creative workspace.

## 1. Design Principles

### 1.1 Chat-First, Not Timeline-First

The primary creation experience is a conversation with an agent. Users should not need to manipulate tracks, clips, keyframes, or traditional nonlinear editing controls.

### 1.2 Approval at Every Major Step

The UI must make approval gates obvious and safe. The user must explicitly approve:

* Script versions.
* Visual plans.
* Individual scenes when needed.
* Assets.
* Image generation requests.
* Voiceover/audio.
* Caption behavior and style.
* Rendering.
* Final render selection.
* Publishing.

### 1.3 Simple Language for Technical Workflows

The app should use user-friendly labels:

| Technical Model | UI Label |
|---|---|
| Project Branch | Variation / Direction |
| Platform Output | Platform Version / Output |
| Render Attempt | Render History Item |
| Approval Record | Decision / Approval History |
| Knowledge Base | Reference Material / Memory |
| Asset Usage | Usage / Placement |

### 1.4 Local-First Confidence

The UI should reinforce that project files and generated media are local by default. When external services are used, the user should understand why.

### 1.5 Source Transparency

Whenever assets, facts, clips, or research are used, the app should show source links, rights notes, and attribution text where available.

## 2. Visual System

### 2.1 Overall Style

hyogen.ai should feel like a premium native macOS app:

* Dark translucent panels.
* Subtle borders.
* Soft shadows.
* Compact typography.
* Native-feeling controls.
* Command-palette driven power navigation.

### 2.2 Color Tokens

| Token | Value | Usage |
|---|---|---|
| `mac.bg` | `#1e1e1e` | Main background |
| `mac.sidebar` | `#252525` | Sidebars and panels |
| `mac.panel` | `rgba(255,255,255,0.05)` | Cards/panels |
| `mac.border` | `#3c3c3c` | Borders |
| `mac.accent` | `#0a84ff` | Primary action / selection |
| `mac.text` | `#dedede` | Main text |
| `mac.muted` | `#8e8e93` | Muted text |
| `mac.input` | `#2d2d2d` | Inputs |
| `mac.hover` | `#3a3a3a` | Hover state |
| `mac.success` | `#30d158` | Success |
| `mac.warning` | `#ff9f0a` | Warning |
| `mac.danger` | `#ff453a` | Error/destructive |

### 2.3 Typography

| Role | Style |
|---|---|
| H1 | `text-2xl font-semibold` |
| H2 / Card title | `text-[18px] font-semibold` |
| Body | `text-[13px] text-mac-text` |
| Helper | `text-[12px] text-mac-muted` |
| Micro / badge | `text-[10px] font-medium uppercase tracking-wider` |
| Monospace | SF Mono / Menlo / Monaco |

### 2.4 Window Layout

Desktop app window target:

* Default logical size: `1200px × 800px`.
* Main app shell uses `overflow-hidden`.
* Internal lists and panels scroll independently.
* Prefer native macOS traffic lights through Tauri titlebar overlay.
* Reserve top-left `80px` so window controls do not overlap content.

### 2.5 Z-Index Scale

| Layer | z-index |
|---|---|
| Base canvas/views | `z-0` |
| Header / drag area | `z-10` |
| Sidebars / right panel | `z-20` |
| Sticky inputs / bottom bars | `z-30` |
| Modals | `z-40` |
| Toasts / command palette | `z-50` |
| Global blocking loader | `z-[999]` |

## 3. Information Architecture

The app should contain these primary areas:

1. **Activation**
2. **Settings**
3. **Channels**
4. **Workflows**
5. **Studio**
6. **Asset Library**
7. **Command Palette**

Recommended global shell after activation:

* Left rail: Channels, Workflows, Studio/Projects, Assets, Settings.
* Main content: selected product area.
* Command palette: available globally via `Cmd + K`.

Studio has a specialized three-column layout:

* Left: channel/project/variation/output navigation.
* Center: chat and approval cards.
* Right: preview, assets, project context, render/publish status.

## 4. Core Navigation Model

### 4.1 Top-Level Views

| View | Purpose |
|---|---|
| Activation | Trial/license entry and status |
| Settings | Provider credentials, publishing accounts, folders, preferences |
| Channels | Brand/client/channel management |
| Workflows | Reusable manual script-generation workflows |
| Studio | Main agentic production workspace |
| Asset Library | Media and source management |

### 4.2 Command Palette

The command palette should support:

* Navigation.
* Creation actions.
* Contextual project actions.
* Safe destructive action entry points.
* Render/publish actions when eligible.

Actions that interrupt rendering or publishing must appear disabled with helper text.

## 5. Activation View

### 5.1 Purpose

Let users start a 14-day trial, enter a license key, and understand whether rendering/publishing is unlocked.

### 5.2 Required UI

* App logo and product name.
* Trial status / license status.
* License key input.
* `Start 14-Day Trial` button.
* `Activate License` button.
* `Purchase License` link.
* Retry validation action.
* Clear internet-required messaging.

### 5.3 States

| State | UI Behavior |
|---|---|
| First launch | Show trial and license options |
| Trial active | Show days remaining and continue action |
| License active | Continue to app |
| License invalid | Red inline error and toast |
| Offline | Explain validation requires internet |
| Expired | Prompt for payment/license activation |

### 5.4 Routing After Activation

After successful trial/license validation:

1. If no provider connections exist, route to Settings.
2. If no channel exists, route to Channels.
3. Otherwise route to Studio or last active workspace area.

## 6. Settings View

### 6.1 Purpose

Manage global app settings, provider connections, publishing accounts, local folders, and preferences.

### 6.2 Settings Sections

Use a left preferences sidebar with these sections:

1. License
2. AI Providers
3. Voice / TTS Providers
4. Image Generation Providers
5. Publishing Accounts
6. Connectors
7. Local Folders
8. General Preferences

### 6.3 Provider Connections

The PRD requires multiple global connections per provider and one default connection per provider.

Provider connection cards should show:

* Provider logo/name.
* Display name.
* Provider type: LLM, TTS, image, embedding, local.
* Masked credential field.
* Default toggle.
* Connection status.
* Last tested timestamp.
* `Test Connection` button.
* `Disable` / `Remove` action.

Supported categories in MVP design:

* OpenAI.
* Anthropic.
* Google / Gemini.
* ElevenLabs.
* Google TTS.
* Sarvam AI.
* Image generation providers.
* Local/self-hosted providers where practical.

### 6.4 Publishing Accounts

Publishing account settings must support multiple accounts per platform.

Platforms:

* YouTube.
* TikTok.
* Instagram.

Each account card should show:

* Platform.
* Display name.
* External account/channel ID.
* Connection status.
* Last tested timestamp.
* `Reconnect` / `Test` / `Remove` actions.

### 6.5 Connectors

Connector settings should model the connector framework from the PRD.

Connector categories:

* YouTube.
* Reddit.
* Twitter/X.
* Notion.
* Google Drive.
* Local files/folders.
* URLs/web.
* RSS.
* Future MCP connectors.

Each connector card should show:

* Connector name.
* Auth status.
* Default connection settings.
* Test action.
* Permissions summary.

### 6.6 Local Folders

Users should configure:

* Default asset folder.
* Music folder.
* Optional export folder.

Folder selection must use native folder picking. Do not rely on standard browser file inputs for folder access.

### 6.7 Usage and Cost Visibility

Because users bring their own provider accounts, the UI should expose lightweight usage visibility without becoming an analytics product.

Settings should include a compact usage area showing:

* Recent LLM token usage.
* Recent TTS character/audio generation usage.
* Recent image generation usage.
* Recent embedding/knowledge-base processing usage.
* Provider errors or failed usage attempts.
* Estimated cost where available from provider metadata.

Usage should be filterable by provider and project where practical.

## 7. Channels View

### 7.1 Purpose

Create and manage brand/client/channel profiles.

### 7.2 Channel Dashboard

Required elements:

* Header: `Channels` / `Brand Profiles`.
* Search/filter.
* `New Channel` button.
* Channel cards.
* Empty state.

Channel card should show:

* Logo/avatar.
* Name.
* Description.
* Status.
* Default platforms.
* Number of projects.
* Number of workflows.
* Quick actions: Open Studio, Edit, Archive, Delete.

### 7.3 Channel Create/Edit Modal

The create/edit experience should be a multi-section modal or full-page form.

Sections:

1. Basics
2. Brand Identity
3. Voice & Tone
4. Format Presets
5. Saved Voices
6. Knowledge Base
7. Source Preferences
8. Publishing Targets

### 7.4 Channel Fields

Channel form should include:

* Name.
* Description.
* Logo/avatar.
* Brand colors.
* Font preferences.
* Visual style notes.
* Tone of voice.
* Target audience.
* Do rules.
* Don’t rules.
* Content pillars/topics.
* Default source preferences.
* Default caption style.
* Default music preferences.

### 7.5 Channel Format Presets

Channels can copy global defaults and customize them.

Format preset cards should show:

* Name.
* Intended platforms.
* Aspect ratio.
* Target duration.
* Caption behavior.
* Voice preference.
* Music preference.
* Publishing metadata defaults.

Default preset types:

* Short-form vertical.
* Long-form horizontal.
* Square/social feed.
* Custom.

### 7.6 Saved Voices

Users should be able to save multiple voices per channel.

Saved voice card:

* Display name.
* Provider.
* Provider voice ID.
* Language/accent/settings.
* Preview sample.
* Default-for-format indicator.

### 7.7 Channel Knowledge Base

Knowledge base material should be presented as “Reference Material” or “Memory.”

Users should be able to:

* Upload documents.
* Link external sources.
* See processing status.
* See scope: channel/project/workflow.
* Archive or delete items.

Supported file types:

* PDF.
* TXT.
* Markdown.
* DOCX.
* CSV.
* Images with readable text where supported.

### 7.8 Default Publishing Targets

Users should select default publishing accounts for the channel.

Example:

* F1 Insights YouTube.
* F1 Insights TikTok.
* F1 Insights Instagram.

If multiple accounts exist for one platform, the user must choose the channel default.

## 8. Workflows View

### 8.1 Purpose

Let users create manually triggered script-generation workflows.

Workflows are not scheduled in MVP.

### 8.2 Workflow Dashboard

Required elements:

* Workflow list.
* Channel filter.
* Last run status.
* Source count.
* `Run Workflow` button.
* `Create Workflow` button.
* Archive/delete actions.

### 8.3 Workflow Builder

The workflow builder should guide users through:

1. Name and description.
2. Channel selection.
3. Default format preset.
4. Source selection.
5. Source rules.
6. Extraction rules.
7. Filtering rules.
8. Writing instructions.
9. Approval requirements.

### 8.4 Workflow Sources

Each source should be a visible row/card, not hidden only in JSON.

Source card examples:

* Reddit community.
* Twitter/X search query.
* YouTube channel/search.
* Notion page/database.
* Google Drive folder.
* RSS feed.
* URL.
* Local folder.

Source card should show:

* Source type.
* Display name.
* URI/query/path.
* Connector status.
* Required/optional toggle.
* Source-specific rules.

### 8.5 Workflow Run Review

After the user manually runs a workflow, show a research review screen/card.

It should include:

* Run status.
* Research summary.
* Individual source items.
* Relevance scores where available.
* Selected/rejected/ignored state.
* Source URL.
* Author/channel.
* Attribution text.
* `Create Script Draft` approval action.

Workflow runs must not publish automatically.

## 9. Studio View

### 9.1 Purpose

Studio is the main agentic production workspace.

### 9.2 Recommended Layout

Three columns:

#### Left Sidebar

Contains:

* Back to Channels.
* Active channel selector.
* Project list.
* Variation/Direction list.
* Platform output list.
* Workflow entry points.
* New project / new variation actions.

#### Center Panel

Contains:

* Chat with agent.
* Approval cards.
* Script version cards.
* Visual plan cards.
* Asset approval cards.
* Image generation approval cards.
* Audio/caption approval cards.
* Render/final approval cards.
* Publishing approval cards.

#### Right Panel

Contains:

* Preview.
* Project context.
* Platform output summary.
* Assets.
* Metadata.
* Render history.
* Publishing status.

### 9.3 Left Sidebar Details

#### New Project Flow

Users should be able to start a project from multiple entry points required by the PRD:

* Blank chat prompt.
* Script generation workflow.
* Local file or folder.
* URL/web page.
* Previous project variation.
* Manually provided content brief.

The new project flow should ask for:

* Channel.
* Starting source.
* Desired platform output(s).
* Relevant knowledge base items.
* Local assets/folders to consider.

After creation, the project opens in Studio with a clear next-step prompt from the agent.

#### Project List

Each project row should show:

* Title.
* Status.
* Updated timestamp.
* Active channel.
* Context menu: Rename, Duplicate, Archive, Delete.

Project statuses should be visually distinct:

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

#### Variations / Directions

Variations should be presented as creative options, not technical branches.

Each variation row should show:

* Name.
* Parent/created-from hint where useful.
* Status.
* Active indicator.
* Actions: duplicate, compare, archive, delete.

#### Platform Outputs

Each platform output should show:

* Platform icon/name.
* Output type.
* Aspect ratio.
* Status.
* Final render indicator.
* Publish status.

Example labels:

* YouTube Long — 16:9.
* YouTube Short — 9:16.
* TikTok — 9:16.
* Instagram Reel — 9:16.

#### Platform Output Configuration

Each platform output should allow configuration of:

* Target platform or local export.
* Output type: long-form, short, reel, feed, custom.
* Aspect ratio: 9:16, 16:9, 1:1, 4:5.
* Target duration.
* Export format: MP4 by default, MOV where needed.
* Caption behavior: separate file, burned in, or both.
* Platform-specific title, description, hashtags, and attribution.
* Publishing account target, if connected.

Platform outputs can have platform-specific script and visual-plan adaptations while still belonging to the same project variation.

### 9.4 Center Chat and Approval Feed

The center feed should feel like an agent workspace rather than a document editor.

The feed should guide the user through this required production sequence:

1. Research/source review.
2. Script approval.
3. Visual plan and scene approval.
4. Asset approval.
5. Image generation approval when needed.
6. Voiceover/audio approval.
7. Caption behavior/style approval.
8. Render approval.
9. Final render selection.
10. Publishing approval.

Message/card types:

* User message.
* Agent text response.
* Research summary card.
* Script version card.
* Visual plan card.
* Scene card.
* Asset candidate card.
* Image generation request card.
* Voiceover preview card.
* Caption style card.
* Render progress card.
* Render result card.
* Publishing metadata card.
* Error/retry card.

### 9.5 Script Version Card

Script revisions are primarily agent-driven, not manual screenplay editing.

Script card should show:

* Version number.
* Status.
* Word count / estimated duration.
* Source workflow or prompt.
* Script body in readable format.
* Approval history link.

Actions:

* Approve script.
* Ask for revision.
* Request alternate hook.
* Request shorter/longer version.
* Archive version.

The user may add comments or revision instructions. Each meaningful revision should create a new script version.

Avoid making a full manual script editor the primary interaction in MVP.

### 9.6 Visual Plan Card

A visual plan card should summarize the scene-by-scene plan.

Required elements:

* Plan version.
* Linked script version.
* Overall status.
* Scene list.
* Full-plan approval action.

### 9.7 Scene Card

Each scene card should show:

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

Scene actions:

* Approve scene.
* Reject scene.
* Request changes.
* Replace asset.
* Find alternatives.

### 9.8 Asset Approval Card

Asset cards should show:

* Thumbnail/preview.
* Asset type.
* Source platform.
* Source URL.
* Local file path when relevant.
* Rights/license notes.
* Attribution text.
* Used in scene/output.
* Approval status.

Actions:

* Approve.
* Reject.
* Replace.
* Edit attribution.
* Open source.
* Locate local file.

If rights are unknown, show a warning but do not block usage solely because automatic rights verification is unavailable.

### 9.9 Image Generation Approval Card

Image generation requires explicit approval before usage.

Card should show:

* Proposed prompt.
* Reason the image is needed.
* Target scene/output.
* Provider/model.
* Estimated cost/usage warning where available.

Actions:

* Approve generation.
* Reject.
* Revise prompt.
* Use existing asset instead.

States:

* Proposed.
* Approved.
* Generating.
* Complete.
* Failed.
* Rejected.

### 9.10 Audio and Voiceover Card

Audio card should show:

* Voice/provider.
* Script version used.
* Duration.
* Preview player.
* Status.
* Error summary if failed.

Actions:

* Approve voiceover.
* Regenerate.
* Change voice.
* Adjust speed/style.

### 9.11 Background Music Card

Music selection should support:

* Local folder selection.
* Free-to-use source discovery.
* Preview.
* Rights/attribution notes.
* Approval.

### 9.12 Caption Style Card

Captions are generated for every video.

The caption card should let the user choose:

* Separate caption file.
* Burned-in captions.
* Both.

If burned in, allow style configuration:

* Font.
* Size.
* Color.
* Background/highlight.
* Position.
* Animation/emphasis where available.

### 9.13 Render Progress Card

While rendering, show:

* Platform output being rendered.
* Current stage.
* Progress percentage.
* Elapsed time.
* Cancel action.

Unsafe navigation/actions should be disabled while rendering.

### 9.14 Render Result and History

Each platform output can have multiple render attempts but one final approved render.

Render history item should show:

* Attempt number.
* Status.
* Output path.
* Started/completed timestamps.
* Error summary if failed.
* Preview action.
* Mark as final action.

When a new render is marked final, older render attempts remain in history.

### 9.15 Publishing Approval Card

After a platform output has a final approved render, show publishing options.

Publishing card should show:

* Platform output.
* Connected publishing account.
* Title.
* Description.
* Hashtags.
* Caption file status.
* Attribution/source credits.
* Visibility/platform options where applicable.

Actions:

* Approve publishing.
* Revise metadata through chat.
* Change account.
* Retry failed publishing.

Publishing always requires explicit approval.

### 9.16 Project Context and Metadata Panel

The right panel should include a project context/metadata tab that shows:

* Active channel.
* Active project.
* Active variation/direction.
* Selected platform output.
* Current project status.
* Selected knowledge base items.
* Source/attribution summary.
* Provider usage summary for the project.
* Render history summary.
* Publishing status summary.

This panel should help the user understand what the agent is currently working with without exposing raw database details.

## 10. Asset Library

### 10.1 Purpose

Manage media used in video production.

The asset library is separate from the knowledge base.

### 10.2 Asset Library View

Required UI:

* Search/filter.
* Type filters: video, image, generated image, audio, music, logo, captions.
* Source filters: local, YouTube, Reddit, URL, free media, image generation.
* Approval filter: pending, approved, rejected, needs changes.
* Rights filter: unknown, user-provided, free-to-use, licensed, needs review.

### 10.3 Asset Detail Panel

Show:

* Preview.
* Metadata.
* Source URL.
* Local path.
* Rights/license notes.
* Attribution text.
* Where used.
* Approval history.

Actions:

* Approve/reject.
* Edit attribution.
* Replace in scene.
* Open source.
* Locate file.
* Remove from project.
* Delete app record.

Deleting an asset record should not delete the local file unless the user separately confirms file deletion.

## 11. Knowledge Base / Reference Material

### 11.1 Purpose

Knowledge base items help the AI reason about facts, brand voice, product details, prior scripts, research notes, and style guidance.

They are not media assets unless explicitly added to the asset library.

### 11.2 Knowledge Base UI

Reference material can appear in:

* Channel edit view.
* Project context panel.
* Workflow builder.

Each item should show:

* Title.
* Type.
* Source.
* Scope links.
* Processing status.
* Last updated.

Statuses:

* Pending.
* Processing.
* Ready.
* Failed.
* Archived.

### 11.3 Scope Linking

One knowledge base item can link to multiple scopes:

* Channel.
* Project.
* Variation.
* Workflow.

The UI should let users see and manage these links.

## 12. Publishing Flow

### 12.1 Publishing Entry Points

Publishing can be opened from:

* Studio right panel.
* Render result card.
* Command palette.
* Platform output row.

### 12.2 Publishing Steps

1. Select platform output.
2. Select connected publishing account.
3. Review metadata.
4. Review caption file and attribution.
5. Approve publishing.
6. Monitor status.
7. Retry on failure if needed.

### 12.3 Publishing Status States

| State | UI |
|---|---|
| Draft | Metadata ready for review |
| Approved | Queued or ready to upload |
| Uploading | Progress indicator |
| Published | External URL and success state |
| Failed | Clean error and retry action |
| Cancelled | Muted cancelled state |

## 13. Approval System Design

### 13.1 Approval Card Anatomy

Every approval card should include:

* Item type.
* Item summary.
* Current status.
* Why approval is needed.
* Risks/costs where applicable.
* Primary approval action.
* Secondary reject/revise action.
* Optional user note field.

### 13.2 Approval Decisions

Supported decisions:

* Approve.
* Reject.
* Needs changes.

Each decision should create an approval record.

### 13.3 Approval History

Users should be able to inspect a compact history of decisions for important items.

History row:

* Decision.
* Timestamp.
* Item type.
* User note.

## 14. Error Handling Design

Errors should be plain-language and actionable.

### 14.1 Toasts

Use toast notifications for short-lived errors:

* Invalid provider key.
* Save failed.
* Connection failed.
* License validation failed.

Actionable toast example:

* Message: `OpenAI connection failed.`
* Action: `Go to Settings`.

### 14.2 Inline Error Cards

Use inline cards for workflow-specific failures:

* Source unavailable.
* Asset download failed.
* Image generation limit reached.
* Render failed.
* Publishing failed.

Inline cards should include:

* What failed.
* Why, if known.
* What the user can do.
* Retry / change provider / skip actions.

### 14.3 Render Errors

Render errors should show:

* Clean summary.
* Retry action.
* Adjust plan action.
* Optional `Show technical details` or `Reveal log file` action.

Raw technical logs should not be displayed by default.

### 14.4 AI Correction State

If the agent produces an invalid plan and is correcting itself, show a non-blocking status:

* `Correcting plan...`
* Warning color.
* No scary technical language unless correction fails.

## 15. Archive and Delete UX

### 15.1 Archive

Archive hides items from primary views without permanent deletion.

Archive should be available for:

* Channels.
* Projects.
* Variations.
* Script versions.
* Knowledge base items.
* Assets.
* Workflows.

### 15.2 Delete

Delete is destructive and requires confirmation.

Confirmation modal should show:

* Item name.
* What will be removed from the app.
* Whether local files are involved.
* Separate checkbox/action if user also wants to delete local files.

Default behavior:

* Delete app record only.
* Do not delete local files unless separately confirmed.

### 15.3 During Active Processes

Archive/delete actions should be disabled or guarded while:

* Rendering.
* Publishing.
* Provider operation is in progress.
* Workflow run is actively collecting sources.

## 16. Command Palette

### 16.1 Trigger

`Cmd + K` globally opens the command palette.

### 16.2 Layout

* Centered modal.
* Search input.
* List of actions.
* Keyboard navigation.
* Empty state.

### 16.3 Global Actions

* Go to Settings.
* Go to Channels.
* Go to Workflows.
* Open Asset Library.
* New Channel.
* New Project.
* Run Workflow.

### 16.4 Studio Context Actions

* Focus chat.
* Create variation.
* Add platform output.
* Add assets.
* Review visual plan.
* Start render when ready.
* Open render history.
* Open publishing flow.
* Archive project.
* Delete project.

### 16.5 Disabled Actions

Actions unsafe during rendering or publishing should remain visible but disabled with helper text:

`Unavailable while rendering` or `Unavailable while publishing`.

Destructive commands must open confirmation, not execute immediately.

## 17. Interaction States

### 17.1 Buttons

| State | Behavior |
|---|---|
| Default | Native macOS style |
| Hover | Slight brightness or panel highlight |
| Active | Slight scale/inset feel |
| Disabled | `opacity-50`, `cursor-not-allowed` |
| Loading | Spinner and disabled state |

### 17.2 Inputs

* Focus ring in accent blue.
* Error ring in red.
* API keys masked by default with reveal toggle.
* Disabled inputs visibly muted.

### 17.3 Process Locks

While rendering:

* Disable project switching.
* Disable variation switching if it could interrupt render state.
* Disable destructive actions.
* Disable conflicting render/publish actions.
* Allow safe preview and progress viewing.

While publishing:

* Disable deleting the platform output.
* Allow viewing status and retry if failed.

## 18. Empty States

### 18.1 No Channels

Message:

`No channels yet. Create your first brand profile to begin.`

Action:

`Create Channel`

### 18.2 No Workflows

Message:

`No workflows yet. Build a reusable research-and-script workflow.`

Action:

`Create Workflow`

### 18.3 No Projects

Message:

`No projects yet. Start from a prompt, workflow, file, or URL.`

Actions:

* `New Project`
* `Run Workflow`

### 18.4 No Assets

Message:

`No assets selected yet. Add local files or let the agent discover candidates.`

Actions:

* `Add Local Assets`
* `Find Assets`

### 18.5 No Platform Outputs

Message:

`No platform versions yet. Add YouTube, TikTok, Instagram, or a custom output.`

Action:

`Add Platform Output`

## 19. Native macOS Integration

### 19.1 Window Controls

Prefer native macOS titlebar overlay. If not possible, custom traffic-light controls must call actual Tauri window APIs.

### 19.2 Native Dialogs

Use native dialogs for:

* Folder selection.
* Local file selection.
* Export/save location.
* Revealing output files where possible.

### 19.3 Notifications

Use native macOS notifications for:

* Render complete.
* Publishing complete.
* Long workflow complete, where useful.

### 19.4 Safe Shutdown

If the app is closing during rendering or publishing, show a confirmation modal.

If force quit is chosen, the frontend must request backend cancellation/cleanup before exiting.

## 20. Design Coverage Matrix

| PRD Requirement | Design Coverage |
|---|---|
| Activation/trial/license | Activation View |
| Global provider settings | Settings View |
| Multiple provider connections/defaults | Settings → Provider Connections |
| Multiple publishing accounts | Settings → Publishing Accounts |
| Channels/brand profiles | Channels View |
| Format presets | Channel Format Presets |
| Saved voices | Channel Saved Voices / Audio Cards |
| Manual workflows | Workflows View |
| Popular connectors | Settings Connectors + Workflow Sources |
| Knowledge base | Reference Material sections |
| Project creation/history | Studio Left Sidebar + New Project Flow |
| Start from prompt/workflow/file/URL/previous branch/brief | New Project Flow |
| Branches/variations | Studio Variations |
| Multiple platform outputs | Studio Platform Outputs + Platform Output Configuration |
| Script versions | Script Version Cards |
| Visual plans/scenes | Visual Plan + Scene Cards |
| Asset approval/source tracking | Asset Approval Cards + Asset Library |
| Image generation approval | Image Generation Approval Card |
| Voiceover preview | Audio Card |
| Caption generation/style | Caption Style Card |
| Render progress/history/final render | Render Cards + Render History |
| MP4/MOV and social aspect ratios | Platform Output Configuration |
| Publishing approval/status | Publishing Flow + Publishing Cards |
| Approval records | Approval System Design |
| Archive/delete behavior | Archive/Delete UX |
| Error handling | Error Handling Design |
| Provider usage/cost visibility | Settings Usage and Cost Visibility + Project Context Panel |
| Command palette | Command Palette |

## 21. Implementation Notes for Agents

* Build the UI from `HYOGEN_PRD.md` and `HYOGEN_ERD.md`; do not use outdated architecture PRD references.
* Do not implement a traditional visual editing timeline.
* Do not make manual script editing the primary UX. Revisions should be agent-driven and create script versions.
* Always represent platform outputs separately from projects and variations.
* Always record approvals for major decisions.
* Do not delete local files by default when deleting app records.
* Use native dialogs/notifications where the desktop context benefits from them.
* Keep technical logs hidden by default and show user-friendly summaries.
