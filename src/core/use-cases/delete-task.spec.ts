// Repositories
import { InMemoryTaskRepository } from "@/test/repositories/in-memory-task-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

// Use Cases
import { DeleteTaskUseCase } from "@/core/use-cases/delete-task";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeTask } from "@/test/factories/make-task";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

let taskRepository: InMemoryTaskRepository;
let userRepository: InMemoryUserRepository;
let sut: DeleteTaskUseCase;

describe("Delete Task", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    userRepository = new InMemoryUserRepository();

    sut = new DeleteTaskUseCase(taskRepository);
  });

  it("should be able to delete a task", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const task = makeTask({ user_id: user.id });
    await taskRepository.create(task);

    await sut.execute({
      id: task.id.value,
    });

    expect(taskRepository.tasks).toHaveLength(0);
  });

  it("should not be able to delete a non-existent task", async () => {
    await expect(
      sut.execute({
        id: "non-existent-task",
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
