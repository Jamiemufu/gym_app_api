// Table workouts {
//     id UUID [pk, unique]
//     exercises varchar
//     created_at timestamp
//     name varchar
//   }

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Mesocycle } from "./Mesocycle";
import { Exercise } from "./Exercise";

@Entity()
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column()
  name!: string;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => Mesocycle, (mesocycle: Mesocycle) => mesocycle.workouts)
  mesocycle!: Mesocycle;

  @OneToMany(() => Exercise, (exercise: Exercise) => exercise.id, { cascade: ["insert", "update"] })
  exercises!: Exercise[];
}