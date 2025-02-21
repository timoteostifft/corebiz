// Libraries
import { Router } from "express";

// Controllers
import { listTasksController } from "@/infra/http/controllers/list-tasks";
import { createTaskController } from "@/infra/http/controllers/create-task";

export const tasksRoutes = Router();

tasksRoutes.get("/", listTasksController);
tasksRoutes.post("/", createTaskController);
