// Libraries
import { asFunction, AwilixContainer } from "awilix";

// Use Cases
import { CreateTaskUseCase } from "@/core/use-cases/create-task";

export function registerUseCases(container: AwilixContainer) {
  container.register(
    "createTaskUseCase",
    asFunction(
      ({ userRepository, taskRepository }) =>
        new CreateTaskUseCase(userRepository, taskRepository)
    )
  );
}
