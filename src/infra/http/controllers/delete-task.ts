// Libraries
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Containers
import { container } from "@/infra/container";

// Use Cases
import { DeleteTaskUseCase } from "@/core/use-cases/delete-task";

export const deleteTaskParams = Joi.object({
  id: Joi.string().uuid().required(),
});

export const deleteTaskController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error: error, value: params } = deleteTaskParams.validate(
      req.params
    );

    if (error) {
      throw error;
    }

    const sut = container.resolve<DeleteTaskUseCase>("deleteTaskUseCase");

    await sut.execute({ id: params.id });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
