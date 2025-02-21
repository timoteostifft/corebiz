// Entities
import { UUID } from "@/core/entities/uuid";
import { Entity, EntityRequest } from "@/core/entities/entity";

// Types
import { Optional } from "@/core/types/optional";

// Entities
import { User } from "@/core/entities/user";

export type TaskStatus = (typeof Task.statuses)[number];

export interface TaskProps extends EntityRequest {
  title: string;
  description: string;
  status: TaskStatus;
  due_date: Date;

  user_id: UUID;
  user?: User;
}

export class Task extends Entity<TaskProps> {
  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get status() {
    return this.props.status;
  }

  get due_date() {
    return this.props.due_date;
  }

  get user_id() {
    return this.props.user_id;
  }

  get user() {
    return this.props.user;
  }

  static create(props: Optional<TaskProps, "status">) {
    return new Task({
      ...props,
      status: props.status ?? "pending",
    });
  }

  static statuses = ["pending", "in_progress", "completed"] as const;
}
