// Entities
import { UUID } from "@/core/entities/uuid";
import { Task, TaskProps } from "@/core/entities/task";

// Libraries
import { faker } from "@faker-js/faker";

export function makeTask(props: Partial<TaskProps> = {}) {
  return Task.create({
    id: new UUID(),
    user_id: props.user_id ?? new UUID(),
    title: props.title ?? faker.lorem.words(3),
    description: props.description ?? faker.lorem.sentence(),
    status: props.status ?? "pending",
    due_date: props.due_date ?? new Date(),
    created_at: props.created_at ?? new Date(),
    updated_at: props.updated_at ?? null,
  });
}
