// Libraries
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Use Cases
import { CreateTaskUseCase } from "@/core/use-cases/create-task";

// Containers
import { container } from "@/infra/container";

// Entities
import { Task } from "@/core/entities/task";

export const createTaskSchema = Joi.object({
  body: Joi.object({
    user_id: Joi.string().uuid().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    due_date: Joi.date().required(),
    status: Joi.string().valid(...Task.statuses),
  }),
});

export const createTaskController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error, value: body } = createTaskSchema.validate(request.body);

    if (error) {
      throw error;
    }

    const sut = container.resolve<CreateTaskUseCase>("createTaskUseCase");

    await sut.execute(body);

    return response.status(201).send();
  } catch (error) {
    next(error);
  }
};
