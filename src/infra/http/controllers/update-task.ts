// Libraries
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Entities
import { Task } from "@/core/entities/task";

// Containers
import { container } from "@/infra/container";

// Use Cases
import { UpdateTaskUseCase } from "@/core/use-cases/update-task";

export const updateTaskParams = Joi.object({
  id: Joi.string().uuid().required(),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  due_date: Joi.date().optional(),
  status: Joi.string()
    .valid(...Task.statuses)
    .optional(),
})
  .or("title", "description", "due_date", "status")
  .required()
  .messages({
    "object.missing": "Pelo menos um campo deve ser fornecido.",
  });

export const updateTaskController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error: paramsError, value: params } = updateTaskParams.validate(
      request.params
    );

    if (paramsError) {
      throw paramsError;
    }

    const { error: bodyError, value: body } = updateTaskSchema.validate(
      request.body
    );

    if (bodyError) {
      throw bodyError;
    }

    const sut = container.resolve<UpdateTaskUseCase>("updateTaskUseCase");

    await sut.execute({
      id: params.id,
      title: body.title,
      description: body.description,
      due_date: body.due_date,
      status: body.status,
    });

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
};
