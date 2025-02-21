// Database
import { prisma } from "@/infra/database/prisma";

// Factories
import { makeUser } from "@/test/factories/make-user";
import { makeTask } from "@/test/factories/make-task";

// Mappers
import { PrismaUserMapper } from "@/infra/database/mappers/prisma-user-mapper";
import { PrismaTaskMapper } from "@/infra/database/mappers/prisma-task-mapper";

const seed = async () => {
  for (let i = 0; i < 40; i++) {
    const user = makeUser();

    await prisma.user.create({ data: PrismaUserMapper.toPrisma(user) });

    const task = makeTask({ user_id: user.id });

    await prisma.task.create({ data: PrismaTaskMapper.toPrisma(task) });
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
