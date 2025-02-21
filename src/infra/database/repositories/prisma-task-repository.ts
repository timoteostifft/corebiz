// Repositories
import {
  TaskRepository,
  TaskRepositoryFilters,
} from "@/core/repositories/task-repository";

// Database
import { prisma } from "@/infra/database/prisma";

// Entities
import { Task } from "@/core/entities/task";

// Mappers
import { PrismaTaskMapper } from "@/infra/database/mappers/prisma-task-mapper";

export class PrismaTaskRepository implements TaskRepository {
  async find({ id, title }: TaskRepositoryFilters): Promise<Task | null> {
    const task = await prisma.task.findFirst({
      where: {
        id: id,
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    if (!task) {
      return null;
    }

    return PrismaTaskMapper.toDomain(task);
  }

  async list({ title }: TaskRepositoryFilters, page: number): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: { title: { contains: title, mode: "insensitive" } },
      skip: (page - 1) * 20,
      take: 20,
      orderBy: { title: "asc" },
    });

    return tasks.map(PrismaTaskMapper.toDomain);
  }

  async create(task: Task): Promise<void> {
    await prisma.task.create({ data: PrismaTaskMapper.toPrisma(task) });
  }

  async update(task: Task): Promise<void> {
    await prisma.task.update({
      where: { id: task.id.value },
      data: PrismaTaskMapper.toPrisma(task),
    });
  }
}
