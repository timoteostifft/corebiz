// Repositories
import { InMemoryTaskRepository } from "@/test/repositories/in-memory-task-repository";
import { InMemoryUserRepository } from "@/test/repositories/in-memory-user-repository";

// Use Cases
import { FetchTaskUseCase } from "@/core/use-cases/fetch-task";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeTask } from "@/test/factories/make-task";

// Errors
import { ResourceNotFoundError } from "@/core/errors/resource-not-found";

let taskRepository: InMemoryTaskRepository;
let userRepository: InMemoryUserRepository;
let sut: FetchTaskUseCase;

describe("Fetch Task", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();
    userRepository = new InMemoryUserRepository();

    sut = new FetchTaskUseCase(taskRepository);
  });

  it("should be able to fetch a task", async () => {
    const user = makeUser();
    await userRepository.create(user);

    const task = makeTask({ user_id: user.id });
    await taskRepository.create(task);

    const result = await sut.execute({
      id: task.id.value,
    });

    expect(result).toBeTruthy();
    expect(result.id.value).toEqual(task.id.value);
    expect(result.title).toEqual(task.title);
    expect(result.user_id.value).toEqual(task.user_id.value);
  });

  it("should not be able to fetch a non-existent task", async () => {
    await expect(
      sut.execute({
        id: "non-existent-task",
      })
    ).rejects.toThrow(ResourceNotFoundError);
  });
});
