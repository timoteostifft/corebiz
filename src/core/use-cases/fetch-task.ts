// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

interface FetchTaskRequest {
  id: string;
}

export class FetchTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ id }: FetchTaskRequest) {
    const task = await this.taskRepository.find({ id });

    if (!task) {
      throw new ResourceNotFoundError("Tarefa", id);
    }

    return task;
  }
}
