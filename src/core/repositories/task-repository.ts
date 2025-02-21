// Entities
import { Task } from "@/core/entities/task";

export interface TaskRepository {
  create(task: Task): Promise<void>;
}
