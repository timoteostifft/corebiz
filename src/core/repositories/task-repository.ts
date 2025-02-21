// Entities
import { Task } from "@/core/entities/task";

export interface TaskRepositoryFilters {
  id?: string;
  title?: string;
}

export interface TaskRepository {
  find(filters: TaskRepositoryFilters): Promise<Task | null>;
  list(filters: TaskRepositoryFilters, page: number): Promise<Task[]>;
  create(task: Task): Promise<void>;
  update(task: Task): Promise<void>;
}
