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
export class UserExerciseTarget {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.exerciseTargets, { nullable: false })
  user!: User;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { nullable: false })
  workout!: Workout;

  @ManyToOne(() => Exercise, (exercise) => exercise.id, { nullable: false })
  exercise!: Exercise;

  @Column()
  target_sets!: number;

  @Column()
  target_reps!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  target_weight!: number;

  @Column()
  intensity!: string;

  @CreateDateColumn()
  created_at!: Date;
}
