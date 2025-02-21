// Entities
import { Entity, EntityRequest } from "@/core/entities/entity";
import { Task } from "@/core/entities/task";
export interface UserProps extends EntityRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  tasks?: Task[];
}

export class User extends Entity<UserProps> {
  get first_name() {
    return this.props.first_name;
  }

  get last_name() {
    return this.props.last_name;
  }

  get name() {
    return `${this.props.first_name} ${this.props.last_name}`;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get tasks() {
    return this.props.tasks;
  }

  static create(props: UserProps) {
    return new User(props);
  }
}
