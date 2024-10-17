// | Column             | Type         | Constraints                   |
// |--------------------|--------------|-------------------------------|
// | id                 | UUID         | Primary Key, Unique           |
// | user_workout_id    | UUID         | References: user_workout_history.id |
// | exercise_id        | UUID         | References: exercises.id      |
// | set_number         | integer      |                               |
// | reps               | integer      |                               |
// | weight             | integer      |                               |

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserWorkout } from "./UserWorkout";
import { Exercise } from "./Exercise";

@Entity()
export class UserWorkoutSet {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  @ManyToOne(() => UserWorkout, (userWorkout) => userWorkout.id)
  user_workout_id!: string;

  @ManyToOne(() => Exercise, (exercise) => exercise.id)
  exercise_id!: string;

  @Column({ nullable: false })
  set_number!: number;

  @Column({ nullable: false })
  reps!: number;

  @Column({ nullable: false })
  weight!: number;
}