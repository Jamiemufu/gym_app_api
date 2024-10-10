import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Workout } from "./Workout";
import { UserExercise } from "./UserExercise";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  muscleGroup!: string;

  @Column()
  equipment!: string;

  @OneToMany(() => UserExercise, (userExercise: UserExercise) => userExercise.exercise)
  userExercises!: UserExercise[];
}
