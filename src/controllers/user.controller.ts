import type { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service.js";
import { ServiceError } from "../lib/errors.js";

function handleError(reply: FastifyReply, error: unknown) {
  if (error instanceof ServiceError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }
  throw error;
}

export const UserController = {
  getAll: async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const users = await UserService.getAll();
      return reply.send(users);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  getById: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await UserService.getById(req.params.id);
      return reply.send(user);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  create: async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const user = await UserService.create(req.body);
      return reply.code(201).send(user);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  update: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const user = await UserService.update(req.params.id, req.body);
      return reply.send(user);
    } catch (error) {
      return handleError(reply, error);
    }
  },

  delete: async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      await UserService.delete(req.params.id);
      return reply.code(204).send();
    } catch (error) {
      return handleError(reply, error);
    }
  },
};
