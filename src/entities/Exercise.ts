import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
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
