import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Mesocycle } from "./Mesocycle";
import { Exercise } from "./Exercise";
import { UserExercise } from "./UserExercise";

@Entity()
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToMany(() => Mesocycle, (mesocycle: Mesocycle) => mesocycle.workouts)
  @JoinTable()
  mesocycle!: Mesocycle[];

  @OneToMany(() => Exercise, (exercise: Exercise) => exercise.id, { cascade: ["insert", "update"] })
  exercises!: Exercise[];

  // Many workouts can have many userExercises
  @ManyToMany(() => UserExercise, (userExercise: UserExercise) => userExercise.workouts)
  @JoinTable()
  userExercises!: UserExercise[];
}