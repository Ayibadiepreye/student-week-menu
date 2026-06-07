---
name: API schema imports
description: Correct import path for generated TypeScript types from the Orval codegen
---

The `@workspace/api-client-react` package re-exports everything from `./src/generated/api.schemas` via its `index.ts`. Import types from the root package name only:

```ts
import type { MainDishFull, OrderFull } from "@workspace/api-client-react";
```

**Why:** The package.json `exports` field only maps `"."` → `"./src/index.ts"`. Sub-path imports like `@workspace/api-client-react/src/generated/api.schemas` are not declared in exports and cause TS2307 errors even though the file exists on disk.

**How to apply:** Any time a file needs generated types (schemas, input/output shapes), always import from `@workspace/api-client-react` directly.
