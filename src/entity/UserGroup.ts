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
export class UserGroup {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.userGroups, { nullable: false })
  user!: User;

  @ManyToOne(() => Group, (group) => group.userGroups, { nullable: false })
  group!: Group;

  @Column()
  role!: string;

  @CreateDateColumn()
  created_at!: Date;
}
