// Entities
import { TaskStatus } from "@/core/entities/task";

// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

interface UpdateTaskRequest {
  id: string;
  title?: string;
  description?: string;
  due_date?: Date;
  status?: TaskStatus;
}

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    id,
    title,
    description,
    due_date,
    status,
  }: UpdateTaskRequest) {
    const task = await this.taskRepository.find({ id: id });

    if (!task) {
      throw new ResourceNotFoundError("Tarefa", id);
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (due_date) task.due_date = due_date;
    if (status) task.status = status;

    await this.taskRepository.update(task);
  }
}
