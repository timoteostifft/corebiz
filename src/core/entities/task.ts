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

  set title(title: string) {
    this.props.title = title;
  }

  set description(description: string) {
    this.props.description = description;
  }

  set status(status: TaskStatus) {
    this.props.status = status;
  }

  set due_date(due_date: Date) {
    this.props.due_date = due_date;
  }

  static create(props: Optional<TaskProps, "status">) {
    return new Task({
      ...props,
      status: props.status ?? "pending",
    });
  }

  static statuses = ["pending", "in_progress", "completed"] as const;
}
