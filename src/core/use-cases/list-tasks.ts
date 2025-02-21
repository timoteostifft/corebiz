// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";

interface ListTasksRequest {
  page: number;
  title?: string;
}

export class ListTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({ page, title }: ListTasksRequest) {
    return await this.taskRepository.list({ title }, page);
  }
}
