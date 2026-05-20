import { ItemModel } from "../models/item.model.js";
import { createItemSchema, updateItemSchema, itemIdParamsSchema } from "../schemas/item.schema.js";
import { ServiceError } from "../lib/errors.js";

export const ItemService = {
  getAll: async () => {
    return ItemModel.findAll();
  },

  getById: async (rawId: string) => {
    const parsed = itemIdParamsSchema.safeParse({ id: rawId });
    if (!parsed.success) throw new ServiceError(400, "Invalid item ID");
    const item = await ItemModel.findById(parsed.data.id);
    if (!item) throw new ServiceError(404, "Item not found");
    return item;
  },

  create: async (rawData: unknown) => {
    const parsed = createItemSchema.safeParse(rawData);
    if (!parsed.success) {
      const messages = parsed.error.issues.map((e) => e.message).join(", ");
      throw new ServiceError(400, messages);
    }
    return ItemModel.create(parsed.data);
  },

  update: async (rawId: string, rawData: unknown) => {
    const idResult = itemIdParamsSchema.safeParse({ id: rawId });
    if (!idResult.success) throw new ServiceError(400, "Invalid item ID");

    const dataResult = updateItemSchema.safeParse(rawData);
    if (!dataResult.success) {
      const messages = dataResult.error.issues.map((e) => e.message).join(", ");
      throw new ServiceError(400, messages);
    }

    const item = await ItemModel.update(idResult.data.id, dataResult.data);
    if (!item) throw new ServiceError(404, "Item not found");
    return item;
  },

  delete: async (rawId: string) => {
    const parsed = itemIdParamsSchema.safeParse({ id: rawId });
    if (!parsed.success) throw new ServiceError(400, "Invalid item ID");
    const item = await ItemModel.delete(parsed.data.id);
    if (!item) throw new ServiceError(404, "Item not found");
    return item;
  },
};
