// Repositories
import { InMemoryTaskRepository } from "@/test/repositories/in-memory-task-repository";

// Use Cases
import { ListTasksUseCase } from "./list-tasks";

// Factories
import { makeTask } from "@/test/factories/make-task";

let taskRepository: InMemoryTaskRepository;

let sut: ListTasksUseCase;

describe("List Tasks", () => {
  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository();

    sut = new ListTasksUseCase(taskRepository);
  });

  it("should be able to list tasks", async () => {
    for (let i = 0; i < 20; i++) {
      const task = makeTask();
      await taskRepository.create(task);
    }

    const tasks = await sut.execute({ page: 1 });

    expect(tasks.length).toBe(20);
  });

  it("should be able to list tasks with title filter", async () => {
    for (let i = 0; i < 19; i++) {
      const task = makeTask();
      await taskRepository.create(task);
    }

    const task = makeTask({ title: "Testing task tile filter" });
    await taskRepository.create(task);

    const tasks = await sut.execute({ page: 1, title: "Testing task" });

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe("Testing task tile filter");
  });

  it("should be able to list pagination", async () => {
    for (let i = 0; i < 45; i++) {
      const task = makeTask();
      await taskRepository.create(task);
    }

    const tasks = await sut.execute({ page: 3 });

    expect(tasks.length).toBe(5);
  });
});
