// Libraries
import j2s from "joi-to-swagger";

// Controllers
import { fetchTaskParams } from "@/infra/http/controllers/fetch-task";
import { listTasksQuery } from "@/infra/http/controllers/list-tasks";
import { createTaskSchema } from "@/infra/http/controllers/create-task";
import { updateTaskParams } from "@/infra/http/controllers/update-task";
import { updateTaskSchema } from "@/infra/http/controllers/update-task";
import { deleteTaskParams } from "@/infra/http/controllers/delete-task";

const { swagger: fetchTaskParamsSwagger } = j2s(fetchTaskParams);
const { swagger: listTasksQuerySwagger } = j2s(listTasksQuery);
const { swagger: createTaskSchemaSwagger } = j2s(createTaskSchema);
const { swagger: updateTaskParamsSwagger } = j2s(updateTaskParams);
const { swagger: updateTaskSchemaSwagger } = j2s(updateTaskSchema);
const { swagger: deleteTaskParamsSwagger } = j2s(deleteTaskParams);

export const docs = {
  openapi: "3.0.0",
  info: {
    title: "Tasks API",
    description: "API para gerenciamento de tarefas",
    version: "1.0.0",
  },
  paths: {
    "/tasks": {
      post: {
        tags: ["Tasks"],
        summary: "Criar uma nova tarefa",
        requestBody: {
          content: {
            "application/json": {
              schema: createTaskSchemaSwagger,
            },
          },
        },
        responses: {
          201: {
            description: "Tarefa criada com sucesso",
          },
          400: {
            description: "Dados inválidos",
          },
        },
      },
      get: {
        tags: ["Tasks"],
        summary: "Listar tarefas",
        parameters: Object.entries(listTasksQuerySwagger.properties).map(
          ([name, schema]) => ({
            in: "query",
            name,
            required: listTasksQuerySwagger.required?.includes(name),
            schema,
          })
        ),
        responses: {
          200: {
            description: "Lista de tarefas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string", format: "uuid" },
                      user_id: { type: "string", format: "uuid" },
                      title: { type: "string" },
                      description: { type: "string" },
                      due_date: { type: "string", format: "date-time" },
                      status: {
                        type: "string",
                        enum: ["pending", "in_progress", "completed"],
                      },
                      created_at: { type: "string", format: "date-time" },
                      updated_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Buscar uma tarefa específica",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: fetchTaskParamsSwagger,
            required: true,
          },
        ],
        responses: {
          200: {
            description: "Tarefa encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: { type: "string", format: "uuid" },
                    user_id: { type: "string", format: "uuid" },
                    title: { type: "string" },
                    description: { type: "string" },
                    due_date: { type: "string", format: "date-time" },
                    status: {
                      type: "string",
                      enum: ["pending", "in_progress", "completed"],
                    },
                    created_at: { type: "string", format: "date-time" },
                    updated_at: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          404: {
            description: "Tarefa não encontrada",
          },
        },
      },
      patch: {
        tags: ["Tasks"],
        summary: "Atualizar uma tarefa",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: updateTaskParamsSwagger,
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: updateTaskSchemaSwagger,
            },
          },
        },
        responses: {
          200: {
            description: "Tarefa atualizada com sucesso",
          },
          404: {
            description: "Tarefa não encontrada",
          },
          400: {
            description: "Dados inválidos",
          },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Deletar uma tarefa",
        parameters: [
          {
            in: "path",
            name: "id",
            schema: deleteTaskParamsSwagger,
            required: true,
          },
        ],
        responses: {
          204: {
            description: "Tarefa deletada com sucesso",
          },
          404: {
            description: "Tarefa não encontrada",
          },
        },
      },
    },
  },
};
