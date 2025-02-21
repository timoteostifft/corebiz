// Repositories
import {
  UserRepository,
  UserRepositoryFilters,
} from "@/core/repositories/user-repository";

// Entities
import { User } from "@/core/entities/user";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async find({ id }: UserRepositoryFilters): Promise<User | null> {
    const user = this.users.find((user) => Boolean(!id || user.id.equals(id)));

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
