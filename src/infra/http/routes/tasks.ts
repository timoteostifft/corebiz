// Libraries
import { Router } from "express";

// Controllers
import { listTasksController } from "@/infra/http/controllers/list-tasks";
import { createTaskController } from "@/infra/http/controllers/create-task";
import { updateTaskController } from "@/infra/http/controllers/update-task";
import { deleteTaskController } from "@/infra/http/controllers/delete-task";

export const tasksRoutes = Router();

tasksRoutes.get("/", listTasksController);
tasksRoutes.post("/", createTaskController);
tasksRoutes.patch("/:id", updateTaskController);
tasksRoutes.delete("/:id", deleteTaskController);
