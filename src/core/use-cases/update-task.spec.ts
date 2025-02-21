// Repositories
import { InMemoryTaskRepository } from "@/test/repositories/in-memory-task-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

// Use Cases
import { UpdateTaskUseCase } from "@/core/use-cases/update-task";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeTask } from "@/test/factories/make-task";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

let taskRepository: InMemoryTaskRepository;
let userRepository: InMemoryUserRepository;
let sut: UpdateTaskUseCase;

describe("Update Task", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    userRepository = new InMemoryUserRepository();

    sut = new UpdateTaskUseCase(taskRepository);
  });

  it("should be able to update a task", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const task = makeTask({ user_id: user.id });
    await taskRepository.create(task);

    const newDueDate = new Date();

    await sut.execute({
      id: task.id.value,
      title: "Updated Task",
      description: "Updated Description",
      due_date: newDueDate,
    });

    expect(taskRepository.tasks[0].title).toBe("Updated Task");
    expect(taskRepository.tasks[0].description).toBe("Updated Description");
    expect(taskRepository.tasks[0].due_date).toBe(newDueDate);
  });

  it("should not be able to update a non-existent task", async () => {
    await expect(
      sut.execute({
        id: "non-existent-task",
        title: "Updated Task",
        description: "Updated Description",
        due_date: new Date(),
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
