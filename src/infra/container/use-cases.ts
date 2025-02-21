// Libraries
import { asFunction, AwilixContainer } from "awilix";

// Use Cases
import { FetchTaskUseCase } from "@/core/use-cases/fetch-task";
import { ListTasksUseCase } from "@/core/use-cases/list-tasks";
import { CreateTaskUseCase } from "@/core/use-cases/create-task";
import { UpdateTaskUseCase } from "@/core/use-cases/update-task";
import { DeleteTaskUseCase } from "@/core/use-cases/delete-task";

export function registerUseCases(container: AwilixContainer) {
  container.register(
    "fetchTaskUseCase",
    asFunction(({ taskRepository }) => new FetchTaskUseCase(taskRepository))
  );
  container.register(
    "listTasksUseCase",
    asFunction(({ taskRepository }) => new ListTasksUseCase(taskRepository))
  );
  container.register(
    "createTaskUseCase",
    asFunction(
      ({ userRepository, taskRepository }) =>
        new CreateTaskUseCase(userRepository, taskRepository)
    )
  );
  container.register(
    "updateTaskUseCase",
    asFunction(({ taskRepository }) => new UpdateTaskUseCase(taskRepository))
  );
  container.register(
    "deleteTaskUseCase",
    asFunction(({ taskRepository }) => new DeleteTaskUseCase(taskRepository))
  );
}
