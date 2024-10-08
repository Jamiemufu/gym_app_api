import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Mesocycle } from "./Mesocycle";
import { Group } from "./Group";
import { Exercise } from "./Exercise";

@Entity()
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Mesocycle, (mesocycle) => mesocycle.workouts, {
    nullable: false,
  })
  mesocycle!: Mesocycle;

  @Column()
  name!: string;

  @ManyToOne(() => Group, (group) => group.workouts, { nullable: false })
  group!: Group;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Exercise, (exercise) => exercise.workout)
  exercises!: Exercise[];
}
