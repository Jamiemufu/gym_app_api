import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user!: User;

  @ManyToOne(() => Group, (group) => group.notifications, { nullable: false })
  group!: Group;

  @Column("text")
  message!: string;

  @CreateDateColumn()
  created_at!: Date;
}
