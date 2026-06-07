---
name: Per-type menu architecture
description: Sides, proteins, and dish configs are per dish-type, not per dish
---

As of the v0.3.0 schema refactor, `sideItems`, `proteinItems`, and `dishConfigs` all reference `mainDishTypeId` (not `mainDishId`).

- `MainDishFull` now only has `types: MainDishTypeFull[]` — no top-level `sides`, `proteins`, or `config`
- `MainDishTypeFull` embeds `sides`, `proteins`, and `config` per type
- Dish config endpoint: `GET/PUT /api/dish-configs/type/{typeId}`
- Menu.tsx must use `selectedType.sides`, `selectedType.proteins`, `selectedType.config` (not `selectedDish.*`)
- `handleSelectType` must auto-populate complementary sides from the **new type's** sides array, not from the dish

**Why:** Allows different types of the same dish (e.g. Jollof Rice vs Fried Rice) to have different available sides and proteins.

**How to apply:** Any new menu or admin feature that deals with sides/proteins must scope to `mainDishTypeId`.
