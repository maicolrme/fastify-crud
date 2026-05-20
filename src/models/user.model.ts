import { db } from "../db/index.js";
import { users, type User, type NewUser } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const UserModel = {
  findAll: () => db.select().from(users),

  findById: (id: number) =>
    db.select().from(users).where(eq(users.id, id)).then((r) => r[0] ?? null),

  create: (data: NewUser) =>
    db.insert(users).values(data).returning().then((r) => r[0]),

  update: (id: number, data: Partial<NewUser>) =>
    db.update(users).set(data).where(eq(users.id, id)).returning().then((r) => r[0] ?? null),

  delete: (id: number) =>
    db.delete(users).where(eq(users.id, id)).returning().then((r) => r[0] ?? null),
};
