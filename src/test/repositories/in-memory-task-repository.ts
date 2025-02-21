// Repositories
import {
  TaskRepository,
  TaskRepositoryFilters,
} from "@/core/repositories/task-repository";

// Entities
import { Task } from "@/core/entities/task";

export class InMemoryTaskRepository implements TaskRepository {
  public tasks: Task[] = [];

  async find({ id, title }: TaskRepositoryFilters): Promise<Task | null> {
    const task = this.tasks.find((task) =>
      Boolean(
        (!id || task.id.value === id) && (!title || task.title.includes(title))
      )
    );

    if (!task) {
      return null;
    }

    return task;
  }

  async list({ title }: TaskRepositoryFilters, page: number): Promise<Task[]> {
    let tasks = this.tasks.filter((task) =>
      Boolean(!title || task.title.includes(title))
    );

    return tasks.slice((page - 1) * 20, page * 20);
  }

  async create(task: Task): Promise<void> {
    this.tasks.push(task);
  }

  async update(task: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id.value === task.id.value);

    this.tasks[index] = task;
  }

  async delete(task: Task): Promise<void> {
    const index = this.tasks.findIndex((t) => t.id.value === task.id.value);

    this.tasks.splice(index, 1);
  }
}
