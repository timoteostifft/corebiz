// Libraries
import { Router } from "express";

// Routes
import { tasksRoutes } from "@/infra/http/routes/tasks";

export const router = Router();

router.use("/tasks", tasksRoutes);
