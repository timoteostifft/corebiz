// Libraries
import { asClass, AwilixContainer } from "awilix";

// Repositories
import { PrismaUserRepository } from "@/infra/database/repositories/prisma-user-repository";
import { PrismaTaskRepository } from "@/infra/database/repositories/prisma-task-repository";

export const registerRepositories = (container: AwilixContainer) => {
  container.register({
    userRepository: asClass(PrismaUserRepository).singleton(),
  });

  container.register({
    taskRepository: asClass(PrismaTaskRepository).singleton(),
  });
};
