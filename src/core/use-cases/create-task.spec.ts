// Repositories
import { InMemoryTaskRepository } from "@/test/repositories/in-memory-task-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

// Use Cases
import { CreateTaskUseCase } from "@/core/use-cases/create-task";

// Factories
import { makeUser } from "@/test/factories/make-user";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

let taskRepository: InMemoryTaskRepository;
let userRepository: InMemoryUserRepository;

let sut: CreateTaskUseCase;

describe("Create Task", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    userRepository = new InMemoryUserRepository();

    sut = new CreateTaskUseCase(userRepository, taskRepository);
  });

  it("should be able to create a task", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const due = new Date();

    await sut.execute({
      user_id: user.id.value,
      title: "Test Task",
      description: "Test Description",
      due_date: due,
    });

    expect(taskRepository.tasks.length).toBe(1);
    expect(taskRepository.tasks[0].title).toBe("Test Task");
    expect(taskRepository.tasks[0].description).toBe("Test Description");
    expect(taskRepository.tasks[0].due_date).toBe(due);
  });

  it("should not be able to create a task with a non-existent user", async () => {
    await expect(
      sut.execute({
        user_id: "none",
        title: "Test Task",
        description: "Test Description",
        due_date: new Date(),
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
