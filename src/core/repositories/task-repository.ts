// Entities
import { Task } from "@/core/entities/task";

export interface TaskRepositoryFilters {
  title?: string;
}

export interface TaskRepository {
  list(filters: TaskRepositoryFilters, page: number): Promise<Task[]>;
  create(task: Task): Promise<void>;
}
