import { UserModel } from "../models/user.model.js";
import { createUserSchema, updateUserSchema, userIdParamsSchema } from "../schemas/user.schema.js";
import type { CreateUserInput, UpdateUserInput } from "../schemas/user.schema.js";
import { ServiceError } from "../lib/errors.js";

export const UserService = {
  getAll: async () => {
    return UserModel.findAll();
  },

  getById: async (rawId: string) => {
    const parsed = userIdParamsSchema.safeParse({ id: rawId });
    if (!parsed.success) throw new ServiceError(400, "Invalid user ID");
    const user = await UserModel.findById(parsed.data.id);
    if (!user) throw new ServiceError(404, "User not found");
    return user;
  },

  create: async (rawData: unknown) => {
    const parsed = createUserSchema.safeParse(rawData);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((e) => e.message).join(", ");
      throw new ServiceError(400, messages);
    }
    return UserModel.create(parsed.data);
  },

  update: async (rawId: string, rawData: unknown) => {
    const idResult = userIdParamsSchema.safeParse({ id: rawId });
    if (!idResult.success) throw new ServiceError(400, "Invalid user ID");

    const dataResult = updateUserSchema.safeParse(rawData);
    if (!dataResult.success) {
      const messages = dataResult.error.issues.map((e) => e.message).join(", ");
      throw new ServiceError(400, messages);
    }

    const user = await UserModel.update(idResult.data.id, dataResult.data);
    if (!user) throw new ServiceError(404, "User not found");
    return user;
  },

  delete: async (rawId: string) => {
    const parsed = userIdParamsSchema.safeParse({ id: rawId });
    if (!parsed.success) throw new ServiceError(400, "Invalid user ID");
    const user = await UserModel.delete(parsed.data.id);
    if (!user) throw new ServiceError(404, "User not found");
    return user;
  },
};
