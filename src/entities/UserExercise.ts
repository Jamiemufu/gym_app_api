// Table userExercises {
//   id UUID [pk, unique]
//   user varchar
//   exercise varchar
//   sets varchar
//   reps varchar
//   weight varchar
//   create_at timestamp
// }

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  ManyToMany
} from "typeorm";
import { Exercise } from "./Exercise";
import { User } from "./User";

@Entity()
export class UserExercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column("float")
  weight!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Exercise, (exercise) => exercise.userExercises)
  exercise!: Exercise;
}