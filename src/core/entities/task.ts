// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";

// Types
import { Optional } from "@/core/types/optional";

export type TaskStatus = (typeof Task.statuses)[number];

export interface TaskProps extends EntityRequest {
  title: string;
  description: string;
  status: TaskStatus;
  due_date: Date;
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

  static create(props: Optional<TaskProps, "status">) {
    return new Task({
      ...props,
      status: props.status ?? "pending",
    });
  }

  static statuses = ["pending", "in_progress", "completed"] as const;
}
