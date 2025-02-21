// Entities
import { UUID } from "@/core/entities/uuid";
import { Task } from "@/core/entities/task";

// Libraries
import { Prisma } from "@prisma/client";

// Mappers
import { PrismaUserMapper } from "./prisma-user-mapper";

export class PrismaTaskMapper {
  static toPrisma(task: Task): Prisma.TaskUncheckedCreateInput {
    return {
      id: task.id.value,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      user_id: task.user_id.value,
    };
  }

  static toDomain(raw: Prisma.TaskGetPayload<{ include: { user?: true } }>) {
    return Task.create({
      id: new UUID(raw.id),
      title: raw.title,
      description: raw.description,
      status: raw.status,
      due_date: raw.due_date,
      user_id: new UUID(raw.user_id),
      ...(raw.user && { user: PrismaUserMapper.toDomain(raw.user) }),
      created_at: raw.createdAt,
      updated_at: raw.updatedAt,
    });
  }
}
