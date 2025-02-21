// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

interface DeleteTaskRequest {
  id: string;
}

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: DeleteTaskRequest) {
    const task = await this.taskRepository.find({ id });

    if (!task) {
      throw new ResourceNotFoundError("Tarefa", id);
    }

    await this.taskRepository.delete(task);
  }
}
