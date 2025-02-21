// Entities
import { User } from "@/core/entities/user";

export interface UserRepositoryFilters {
  id?: string;
}

export interface UserRepository {
  find(filters: UserRepositoryFilters): Promise<User | null>;
  create(user: User): Promise<void>;
}
