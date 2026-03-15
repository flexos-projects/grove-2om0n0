---
id: database-index
title: "Database Specs"
type: index
subtype: folder
status: active
---

<flex_block type="instructions">
Database specs define WHAT DATA EXISTS AND HOW IT'S STRUCTURED.

SUBTYPES:
- collection: A database collection/table (Convex table, Firestore collection, etc.)
- api: An API endpoint definition
- store: A client-side state store (Pinia)

NAMING: NNN-{subtype}-{slug}.md
EXAMPLE: 001-collection-users.md, 005-api-conversations.md

Each collection spec MUST include a schema flex_block:
{
  "collection": "name",
  "description": "what it stores",
  "fields": [{ "name", "type", "required", "description" }],
  "indexes": ["field1", "field1,field2"]
}

Field types: string, number, boolean, date, reference, array, object
Reference fields include "ref": "collection-name"
</flex_block>
