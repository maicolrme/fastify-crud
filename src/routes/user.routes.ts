import type { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.js";

const userResponse = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    email: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
  },
};

const errorResponse = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export async function userRoutes(app: FastifyInstance) {
  app.get("/users", {
    schema: {
      tags: ["Users"],
      description: "List all users",
      response: {
        200: {
          type: "array",
          items: userResponse,
        },
      },
    },
  }, UserController.getAll);

  app.get("/users/:id", {
    schema: {
      tags: ["Users"],
      description: "Get user by ID",
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"],
      },
      response: {
        200: userResponse,
        404: errorResponse,
      },
    },
  }, UserController.getById);

  app.post("/users", {
    schema: {
      tags: ["Users"],
      description: "Create a new user",
      body: {
        type: "object",
        required: ["name", "email"],
        properties: {
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
        },
      },
      response: {
        201: userResponse,
        400: errorResponse,
      },
    },
  }, UserController.create);

  app.put("/users/:id", {
    schema: {
      tags: ["Users"],
      description: "Update a user",
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1 },
          email: { type: "string", format: "email" },
        },
      },
      response: {
        200: userResponse,
        400: errorResponse,
        404: errorResponse,
      },
    },
  }, UserController.update);

  app.delete("/users/:id", {
    schema: {
      tags: ["Users"],
      description: "Delete a user",
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"],
      },
      response: {
        204: { type: "null" },
        400: errorResponse,
        404: errorResponse,
      },
    },
  }, UserController.delete);
}
