import type { FastifyRequest, FastifyReply } from "fastify";
import { ItemService } from "../services/item.service.js";
import { ServiceError } from "../lib/errors.js";

function handleError(reply: FastifyReply, error: unknown) {
  if (error instanceof ServiceError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }
  throw error;
}

export const ItemController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const items = await ItemService.getAll();
      return reply.send(items);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  getById: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const item = await ItemService.getById(req.params.id);
      return reply.send(item);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  create: async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const item = await ItemService.create(req.body);
      return reply.code(201).send(item);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  update: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const item = await ItemService.update(req.params.id, req.body);
      return reply.send(item);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  delete: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      await ItemService.delete(req.params.id);
      return reply.code(204).send();
    } catch (error) {
      return handleError(reply, error);
    }
  },
};
