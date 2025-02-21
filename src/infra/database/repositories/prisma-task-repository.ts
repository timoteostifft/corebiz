// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";

// Database
import { prisma } from "@/infra/database/prisma";

// Entities
import { Task } from "@/core/entities/task";

// Mappers
import { PrismaTaskMapper } from "@/infra/database/mappers/prisma-task-mapper";

export class PrismaTaskRepository implements TaskRepository {
  async create(task: Task): Promise<void> {
    await prisma.task.create({ data: PrismaTaskMapper.toPrisma(task) });
  }
}
