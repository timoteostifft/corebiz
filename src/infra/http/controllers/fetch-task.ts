// Libraries
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Containers
import { container } from "@/infra/container";

// Use Cases
import { FetchTaskUseCase } from "@/core/use-cases/fetch-task";

// Presenters
import { TaskPresenter } from "@/infra/http/presenters/task-presenter";

export const fetchTaskParams = Joi.object({
  id: Joi.string().uuid().required(),
});

export const fetchTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error: error, value: params } = fetchTaskParams.validate(
      req.params
    );

    if (error) {
      throw error;
    }

    const sut = container.resolve<FetchTaskUseCase>("fetchTaskUseCase");

    const task = await sut.execute({ id: params.id });

    return res.status(200).json(TaskPresenter.toHttp(task));
  } catch (error) {
    next(error);
  }
};
