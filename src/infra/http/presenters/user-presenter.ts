// Entities
import { User } from "@/core/entities/user";

// Types
import { View } from "@/infra/types/view";

// Presenters
import { TaskPresenter } from "@/infra/http/presenters/task-presenter";

export class UserPresenter {
  static toView(user?: User): View<User> {
    if (user) {
      return {
        id: user.id.value,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at,
        tasks: user.tasks?.map((task) => TaskPresenter.toView(task)),
      };
    }
  }
}
