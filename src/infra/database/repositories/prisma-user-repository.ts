// Repositories
import {
  UserRepository,
  UserRepositoryFilters,
} from "@/core/repositories/user-repository";

// Database
import { prisma } from "@/infra/database/prisma";

// Entities
import { User } from "@/core/entities/user";

// Mappers
import { PrismaUserMapper } from "@/infra/database/mappers/prisma-user-mapper";

export class PrismaUserRepository implements UserRepository {
  async find({ id }: UserRepositoryFilters): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<void> {
    await prisma.user.create({ data: PrismaUserMapper.toPrisma(user) });
  }
}
