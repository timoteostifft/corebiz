// Entities
import { Task } from "@/core/entities/task";

// Types
import { View } from "@/infra/types/view";

// Presenters
import { UserPresenter } from "@/infra/http/presenters/user-presenter";

export class TaskPresenter {
  static toHttp(task?: Task): View<Task> {
    if (task) {
      return {
        id: task.id.value,
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        status: task.status,
        user_id: task.user_id.value,
        user: UserPresenter.toHttp(task.user),
        created_at: task.created_at,
        updated_at: task.updated_at,
      };
    }
  }
}
