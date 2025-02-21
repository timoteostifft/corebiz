// Libraries
import { Router } from "express";

// Controllers
import { createTaskController } from "@/infra/http/controllers/create-task";

export const tasksRoutes = Router();

tasksRoutes.post("/", createTaskController);
