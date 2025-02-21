// Entities
import { Task, TaskStatus } from "@/core/entities/task";

// Repositories
import { TaskRepository } from "@/core/repositories/task-repository";
import { UserRepository } from "@/core/repositories/user-repository";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

interface CreateTaskRequest {
  user_id: string;
  title: string;
  description: string;
  due_date: Date;
  status?: TaskStatus;
}

export class CreateTaskUseCase {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository
  ) {}

  async execute({
    user_id,
    title,
    description,
    status,
    due_date,
  }: CreateTaskRequest) {
    const user = await this.userRepository.find({ id: user_id });

    if (!user) {
      throw new ResourceNotFoundError("Usuário", user_id);
    }

    const task = Task.create({
      title,
      description,
      due_date,
      status,
      user_id: user.id,
    });

    await this.taskRepository.create(task);
  }
}
