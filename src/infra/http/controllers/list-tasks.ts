// Libraries
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Use Cases
import { ListTasksUseCase } from "@/core/use-cases/list-tasks";

// Containers
import { container } from "@/infra/container";

// Presenters
import { TaskPresenter } from "@/infra/http/presenters/task-presenter";

export const listTasksSchema = Joi.object({
  page: Joi.number().required(),
  title: Joi.string().optional(),
});

export const listTasksController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error, value: query } = listTasksSchema.validate(request.query);

    console.log(query);

    if (error) {
      throw error;
    }

    const sut = container.resolve<ListTasksUseCase>("listTasksUseCase");

    const tasks = await sut.execute(query);

    return response.status(200).json(tasks.map(TaskPresenter.toView));
  } catch (error) {
    next(error);
  }
};
