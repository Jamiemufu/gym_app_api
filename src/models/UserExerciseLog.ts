import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";
import { Exercise } from "./Exercise";

@Entity()
export class UserExerciseLog {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.exerciseLogs, { nullable: false })
  user!: User;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { nullable: false })
  workout!: Workout;

  @ManyToOne(() => Exercise, (exercise) => exercise.id, { nullable: false })
  exercise!: Exercise;

  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  weight!: number;

  @CreateDateColumn()
  log_date!: Date;
}
