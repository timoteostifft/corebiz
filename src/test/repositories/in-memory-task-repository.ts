// Repositories
import {
  TaskRepository,
  TaskRepositoryFilters,
} from "@/core/repositories/task-repository";

// Entities
import { Task } from "@/core/entities/task";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];

  async list({ title }: TaskRepositoryFilters, page: number): Promise<Task[]> {
    let tasks = this.tasks.filter((task) =>
      Boolean(!title || task.title.includes(title))
    );

    return tasks.slice((page - 1) * 20, page * 20);
  }

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}
