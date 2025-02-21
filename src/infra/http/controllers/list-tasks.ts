// Libraries
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Use Cases
import { ListTasksUseCase } from "@/core/use-cases/list-tasks";

// Containers
import { container } from "@/infra/container";

// Presenters
import { TaskPresenter } from "@/infra/http/presenters/task-presenter";

export const listTasksQuery = Joi.object({
  page: Joi.number().integer().required(),
  title: Joi.string().optional(),
});

export const listTasksController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { error, value: query } = listTasksQuery.validate(request.query);

    if (error) {
      throw error;
    }

    const sut = container.resolve<ListTasksUseCase>("listTasksUseCase");

    const tasks = await sut.execute(query);

    return response.status(200).json(tasks.map(TaskPresenter.toHttp));
  } catch (error) {
    next(error);
  }
};
