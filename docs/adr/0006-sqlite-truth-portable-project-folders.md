# SQLite Operational Truth with Portable Project Folders

SQLite is the operational source of truth for workspace, project, artifact, approval, and trace state, while project folders contain inspectable media, renders, manifests, and snapshots for portability and relinking. This deliberately accepts some duplicated state between database records and folder manifests so the app can be reliable and queryable without hiding project outputs inside an opaque database.
