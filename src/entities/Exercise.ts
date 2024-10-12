// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { UserExercise } from "./UserExercise";

// @Entity()
// export class Exercise {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @Column()
//   name!: string;

//   @Column()
//   muscleGroup!: string;

//   @Column()
//   equipment!: string;

//   @OneToMany(() => UserExercise, userExercise => userExercise.exercise)
//   userExercises!: UserExercise[];
// }

// ### Exercises Table
// | Column         | Type         | Constraints                   |
// |----------------|--------------|-------------------------------|
// | id             | UUID         | Primary Key, Unique           |
// | name           | varchar      | Not Null                      |
// | muscle_group   | varchar      |                               |
// | equipment      | varchar      |                               |