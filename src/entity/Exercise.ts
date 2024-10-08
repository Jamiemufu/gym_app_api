import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Workout } from "./Workout";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Workout, (workout) => workout.exercises, { nullable: false })
  workout!: Workout;

  @Column()
  name!: string;

  @Column()
  muscle_group!: string;

  @Column({ nullable: true })
  default_rest_interval!: number;

  @CreateDateColumn()
  created_at!: Date;
}
