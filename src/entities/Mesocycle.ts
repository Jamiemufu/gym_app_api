import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";
import { join } from "path";

@Entity()
export class Mesocycle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Name of the mesocycle
  @Column()
  name!: string;

  // Length of the mesocycle in weeks
  @Column()
  length!: number;

  // Completed or not
  @Column()
  completed!: boolean;

  // Active or not !! We can have only one active mesocycle at a time
  @Column()
  active!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  // Workout Link
  @ManyToMany(() => Workout, (workout: Workout) => workout.mesocycle)
  workouts!: Workout[];

  // User Link
  @ManyToMany(() => User, (user: User) => user.mesocycles)
  users!: User[];
}
