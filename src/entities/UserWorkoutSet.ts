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
import { IsNumber } from 'class-validator';

@Entity()
export class UserWorkoutSet {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserWorkout, (userWorkout) => userWorkout.id, { cascade: true, eager: true })
  user_workout!: UserWorkout;

  @ManyToOne(() => Exercise, (exercise) => exercise.id, { cascade: true, eager: true }) 
  exercise!: Exercise;

  @IsNumber()
  @Column({ nullable: false })
  set_number!: number;

  @IsNumber()
  @Column({ nullable: false })
  reps!: number;

  @IsNumber()
  @Column({ nullable: false })
  weight!: number;
}
