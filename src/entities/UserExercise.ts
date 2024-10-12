// import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinTable, ManyToMany, OneToMany } from "typeorm";
// import { Exercise } from "./Exercise";
// import { User } from "./User";
// import { Workout } from "./Workout";

// @Entity()
// export class UserExercise {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;

//   @Column()
//   sets!: number;

//   @Column()
//   reps!: number;

//   @Column("float")
//   weight!: number;

//   @CreateDateColumn()
//   createdAt!: Date;

//   @ManyToOne(() => User, (user) => user.userExercises)
//   user!: User;

//   @ManyToOne(() => Exercise, (exercise) => exercise.userExercises)
//   exercise!: Exercise;

//   @ManyToMany(() => Workout, (workout) => workout.userExercises)
//   workouts!: Workout[];
// }
