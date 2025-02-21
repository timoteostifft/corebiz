// Libraries
import { Router } from "express";

// Controllers
import { fetchTaskController } from "@/infra/http/controllers/fetch-task";
import { listTasksController } from "@/infra/http/controllers/list-tasks";
import { createTaskController } from "@/infra/http/controllers/create-task";
import { updateTaskController } from "@/infra/http/controllers/update-task";
import { deleteTaskController } from "@/infra/http/controllers/delete-task";

export const tasksRoutes = Router();

tasksRoutes.get("/:id", fetchTaskController);
tasksRoutes.get("/", listTasksController);
tasksRoutes.post("/", createTaskController);
tasksRoutes.patch("/:id", updateTaskController);
tasksRoutes.delete("/:id", deleteTaskController);
