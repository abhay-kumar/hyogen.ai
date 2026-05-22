# DeepAgents Owns the Guided Workflow

hyogen.ai will implement the canonical guided project workflow in the managed DeepAgents runtime rather than a custom Rust workflow engine. Rust supervises the local boundary—persistence, credentials, filesystem, child processes, redaction, and trace ingestion—while DeepAgents owns stage transitions, approval interrupts, tool orchestration, retries, and downstream invalidation. This trades tighter Rust control for a single agentic orchestration layer that can evolve with the workflow without duplicating agent behavior in two places.
