# hyogen.ai

hyogen.ai is a local-first app where creators direct AI agents to produce short-form vertical video packages without operating a manual editing timeline.

## Language

### People and durable creator context

**Creator**:
A person who directs the creative intent for a video and approves major decisions.
_Avoid_: editor, operator

**Reference Creator**:
The primary Creator hyogen.ai optimizes for: a solo/prosumer maker of faceless factual explainer or news shorts.
_Avoid_: agency, general creator

**Workspace**:
A Creator-selected local home for their Brand Profiles, Projects, reusable settings, and project history.
_Avoid_: account, cloud workspace, team

**Brand Profile**:
A reusable creator or channel identity that defines audience, tone, visual style, and publishing defaults.
_Avoid_: account, workspace, channel config

**Saved Content Recipe**:
A reusable starting format for Projects with preset creative, sourcing, style, and publishing preferences.
_Avoid_: automation, workflow template

### Projects and outputs

**Project**:
A single effort to produce one publish-ready vertical short package.
_Avoid_: job, edit, campaign

**Variation**:
An alternate creative direction within a Project.
_Avoid_: branch, version, platform output

**Faceless Factual Short**:
A short-form video built around narrated explanation or news without an on-camera host.
_Avoid_: talking-head video, promo

**Reference Workflow**:
The primary end-to-end Project path used to judge MVP quality for the Reference Creator.
_Avoid_: feature matrix, demo flow

**Final Package**:
The approved set of publish-ready video files and supporting reports for one Project or Variation.
_Avoid_: export, deliverable

### Workflow and approval

**Guided Workflow**:
A stage-based creative process where hyogen proposes work and the Creator directs or approves major decisions.
_Avoid_: freeform autonomous agent, manual editor workflow

**Approval Gate**:
A formal point where a Creator accepts, rejects, or requests changes to a meaningful creative or risk-bearing decision.
_Avoid_: checkpoint, confirmation

**Full Agentic Mode**:
A Project mode where hyogen may research, discover sources, and propose media beyond the Creator's starting inputs.
_Avoid_: autonomous mode, default mode

**Source-Only Mode**:
A degraded Project mode where hyogen only uses Creator-provided URLs, files, and folders as source material.
_Avoid_: offline mode, manual mode

**Artifact Version**:
An immutable snapshot of a meaningful creative output preserved so later changes do not overwrite prior decisions.
_Avoid_: draft, save point

### Sources, media, and rights

**Discovery Lead**:
A suggested source or media result that must be fetched or materialized before it can support final work.
_Avoid_: citation, evidence

**Source Material**:
A fetched or user-provided item that can support claims, visuals, or attribution in a Project.
_Avoid_: search result, provider citation

**Media Candidate**:
A possible visual or audio item considered for a Project before it is approved for use.
_Avoid_: asset, final media

**Selected Media**:
A Media Candidate approved for a specific visual or audio use in a Project.
_Avoid_: raw download, media candidate

**Render Input**:
An immutable media item prepared from Selected Media or generated visuals for final assembly.
_Avoid_: raw download, source file

**Fallback Visual**:
A simple non-sourced visual used when a Project lacks suitable selected media.
_Avoid_: placeholder, dummy asset

**Rights Label**:
A conservative usage-risk category attached to media so the Creator can make an informed approval decision.
_Avoid_: license clearance, legal approval

### Creative building blocks

**Script Segment**:
A contiguous portion of approved narration used to align voice, captions, and visuals.
_Avoid_: paragraph, scene

**Visual Scene**:
A coherent visual beat in a Project that groups one or more Shots around a script idea.
_Avoid_: chapter, slide

**Shot**:
The smallest planned visual unit matched to a specific script cue.
_Avoid_: scene, clip

**Voice Performance**:
Provider-agnostic spoken delivery direction for an approved script.
_Avoid_: SSML, voiceover text

**Caption Set**:
The timed words and style choice used for burned captions and sidecar captions.
_Avoid_: subtitles file, caption preset

**Quality Finding**:
A structured issue raised by hyogen about script, media, render, brand, citation, or rights quality.
_Avoid_: test failure, blocker

### Providers and observability

**Provider Connection**:
A configured relationship with an external AI or tool service that can expose one or more Provider Capabilities.
_Avoid_: model, integration

**Provider Capability**:
A kind of work a configured provider can perform for a Project.
_Avoid_: provider, model, integration

**Run Trace**:
A local explanation record of what happened during a Guided Workflow.
_Avoid_: telemetry, analytics

## Relationships

- A **Creator** chooses a **Workspace**.
- A **Creator** owns one or more **Brand Profiles**.
- A **Reference Creator** primarily uses the **Reference Workflow** to produce **Faceless Factual Shorts**.
- A **Workspace** contains **Brand Profiles**, **Projects**, **Saved Content Recipes**, and project history.
- A **Project** uses exactly one **Brand Profile**.
- A **Project** may start from a **Saved Content Recipe**.
- A **Project** runs in either **Full Agentic Mode** or **Source-Only Mode**.
- A **Project** may have one or more **Variations**.
- A **Project** contains **Script Segments**, **Visual Scenes**, and **Shots**.
- A **Visual Scene** contains one or more **Shots**.
- A **Shot** is tied to one or more **Script Segments**.
- A **Discovery Lead** becomes **Source Material** only after it is materialized.
- **Source Material** may produce **Media Candidates**.
- **Selected Media** is approved from **Media Candidates** for specific **Shots**.
- **Render Inputs** are prepared from **Selected Media**, generated visuals, or **Fallback Visuals**.
- A **Variation** produces at most one **Final Package**.
- A **Final Package** includes **Rights Labels**, source attribution, citations where relevant, and quality reports.
- A **Provider Connection** exposes one or more **Provider Capabilities**.
- A **Guided Workflow** records **Artifact Versions**, **Approval Gates**, **Quality Findings**, and **Run Traces**.

## Example dialogue

> **Dev:** "Can a provider search result count as a citation in the Final Package?"
> **Domain expert:** "No. That is only a Discovery Lead until hyogen materializes it as Source Material. If it cannot be materialized, it can be shown as unverified context but not treated as final evidence."
>
> **Dev:** "If the Project has no good footage for a Shot, should we block rendering?"
> **Domain expert:** "Not automatically. Use a Fallback Visual or approved generated visual, record the Quality Finding, and let the Creator approve the risk at the relevant Approval Gate."

## Flagged ambiguities

- "quality" was resolved as excellence of the **Reference Workflow**, not broad coverage of every content mode or provider path.
- "source" was resolved as **Source Material** only after a **Discovery Lead** is fetched or materialized.
- "asset" was split into **Media Candidate**, **Selected Media**, and **Render Input** because each has a different approval and reproducibility meaning.
- "workflow" was resolved as a **Guided Workflow**, not a freeform autonomous agent or manual editing timeline.
- "approval" was resolved as an **Approval Gate** tied to a meaningful creative or risk-bearing decision.
- "provider setup" was resolved as **Provider Capability** setup rather than hard-coded provider-specific workflow state.
- "basic visuals" was resolved as **Fallback Visuals** first, with user media and approved image generation as additive paths.
