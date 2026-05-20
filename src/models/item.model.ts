import { db } from "../db/index.js";
import { items, type Item, type NewItem } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const ItemModel = {
  findAll: () => db.select().from(items),

  findById: (id: number) =>
    db.select().from(items).where(eq(items.id, id)).then((r) => r[0] ?? null),

  create: (data: NewItem) =>
    db.insert(items).values(data).returning().then((r) => r[0]),

  update: (id: number, data: Partial<NewItem>) =>
    db.update(items).set(data).where(eq(items.id, id)).returning().then((r) => r[0] ?? null),

  delete: (id: number) =>
    db.delete(items).where(eq(items.id, id)).returning().then((r) => r[0] ?? null),
};
