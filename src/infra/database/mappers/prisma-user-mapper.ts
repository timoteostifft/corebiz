// Entities
import { UUID } from "@/core/entities/uuid";
import { User } from "@/core/entities/user";

// Libraries
import { Prisma } from "@prisma/client";

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.value,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
    };
  }

  static toDomain(user: Prisma.UserGetPayload<{}>): User {
    return User.create({
      id: new UUID(user.id),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    });
  }
}
