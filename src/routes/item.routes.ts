import type { FastifyInstance } from "fastify";
import { ItemController } from "../controllers/item.controller.js";

const itemResponse = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    description: { type: "string" },
    price: { type: "number" },
    userId: { type: "number" },
    createdAt: { type: "string", format: "date-time" },
  },
};

const errorResponse = {
  type: "object",
  properties: {
    error: { type: "string" },
  },
};

export async function itemRoutes(app: FastifyInstance) {
  app.get("/items", {
    schema: {
      tags: ["Items"],
      description: "List all items",
      response: {
        200: {
          type: "array",
          items: itemResponse,
        },
      },
    },
  }, ItemController.getAll);

  app.get("/items/:id", {
    schema: {
      tags: ["Items"],
      description: "Get item by ID",
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"],
      },
      response: {
        200: itemResponse,
        404: errorResponse,
      },
    },
  }, ItemController.getById);

  app.post("/items", {
    schema: {
      tags: ["Items"],
      description: "Create a new item",
      body: {
        type: "object",
        required: ["name", "price"],
        properties: {
          name: { type: "string", minLength: 1 },
          description: { type: "string" },
          price: { type: "number", exclusiveMinimum: 0 },
          userId: { type: "number" },
        },
      },
      response: {
        201: itemResponse,
        400: errorResponse,
      },
    },
  }, ItemController.create);

  app.put("/items/:id", {
    schema: {
      tags: ["Items"],
      description: "Update an item",
      params: {
        type: "object",
        properties: { id: { type: "number" } },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1 },
          description: { type: "string" },
          price: { type: "number", exclusiveMinimum: 0 },
          userId: { type: "number" },
        },
      },
      response: {
        200: itemResponse,
        400: errorResponse,
        404: errorResponse,
      },
    },
  }, ItemController.update);

  app.delete("/items/:id", {
    schema: {
      tags: ["Items"],
      description: "Delete an item",
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
  }, ItemController.delete);
}
