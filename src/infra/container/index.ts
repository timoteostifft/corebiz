// Libraries
import { createContainer } from "awilix";

// Container
import { registerUseCases } from "@/infra/container/use-cases";
import { registerRepositories } from "@/infra/container/repositories";

export const container = createContainer();

registerUseCases(container);
registerRepositories(container);
