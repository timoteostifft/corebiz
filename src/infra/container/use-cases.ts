// Libraries
import { asFunction, AwilixContainer } from "awilix";

// Use Cases
import { ListTasksUseCase } from "@/core/use-cases/list-tasks";
import { CreateTaskUseCase } from "@/core/use-cases/create-task";

export function registerUseCases(container: AwilixContainer) {
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
}
