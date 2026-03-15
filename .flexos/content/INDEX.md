---
id: content-index
title: "Content"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Content specs define WHAT DATA AND COPY THE PROJECT NEEDS beyond the database schema.
Each subfolder is a collection. Each collection has:
- INDEX.md (type: content, subtype: collection) — defines the collection
- Numbered record files (type: content, subtype: record) — individual entries

DEFAULT COLLECTION: context/
The context collection ships with every project as a catch-all for unstructured
knowledge: company info, brand voice, competitor research, marketing copy, etc.

OTHER COLLECTIONS: blogs/, testimonials/, faqs/, mock-data/, etc.
Created as needed by the project.

NAMING: {collection-name}/NNN-{slug}.md
EXAMPLE: context/001-about.md, mock-data/001-seed-records.md
</flex_block>
