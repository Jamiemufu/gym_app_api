// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | user_id       | UUID         | References: users.id          |
// | workout_id    | UUID         | References: public_workouts.id |
// | date          | timestamp    |                               |

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";
import { UserWorkoutSet } from "./UserWorkoutSet";

@Entity()
export class UserWorkoutHistory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.id)
  user!: string;
  
  @ManyToOne(() => Workout, (workout) => workout.id)
  workout!: string;

  @CreateDateColumn()
  date!: Date;

  @OneToMany(() => UserWorkoutSet, (userWorkoutSet) => userWorkoutSet.id, {
    cascade: true,
  })
  sets!: UserWorkoutSet[];
}
