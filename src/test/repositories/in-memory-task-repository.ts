// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";

// Entities
import { Task } from "@/core/entities/task";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }
}
