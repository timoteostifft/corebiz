// Libraries
import { asClass, AwilixContainer } from "awilix";

// Repositories
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";
import { InMemoryTaskRepository } from "@/test/repositories/in-memory-task-repository";

export const registerRepositories = (container: AwilixContainer) => {
  container.register({
    userRepository: asClass(InMemoryUserRepository).singleton(),
  });

  container.register({
    taskRepository: asClass(InMemoryTaskRepository).singleton(),
  });
};
