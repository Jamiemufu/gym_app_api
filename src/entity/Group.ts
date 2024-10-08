import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UserGroup } from "./UserGroup";
import { GroupChallenge } from "./GroupChallenge";
import { GroupProgressReport } from "./GroupProgressReport";
import { Notification } from "./Notification";
import { Workout } from "./Workout";

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group)
  userGroups!: UserGroup[];

  @OneToMany(() => GroupChallenge, (challenge) => challenge.group)
  challenges!: GroupChallenge[];

  @OneToMany(() => GroupProgressReport, (report) => report.group)
  progressReports!: GroupProgressReport[];

  @OneToMany(() => Notification, (notification) => notification.group)
  notifications!: Notification[];

  @OneToMany(() => Workout, (workout) => workout.group)
  workouts!: Workout[];
}
