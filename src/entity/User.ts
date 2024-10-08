import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UserGroup } from "./UserGroup";
import { UserMesocycle } from "./UserMesocycle";
import { UserExerciseLog } from "./UserExerciseLog";
import { UserExerciseTarget } from "./UserExerciseTarget";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user)
  userGroups!: UserGroup[];

  @OneToMany(() => UserMesocycle, (userMesocycle) => userMesocycle.user)
  userMesocycles!: UserMesocycle[];

  @OneToMany(() => UserExerciseLog, (userExerciseLog) => userExerciseLog.user)
  exerciseLogs!: UserExerciseLog[];

  @OneToMany(
    () => UserExerciseTarget,
    (userExerciseTarget) => userExerciseTarget.user
  )
  exerciseTargets!: UserExerciseTarget[];
}
