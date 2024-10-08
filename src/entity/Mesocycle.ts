import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { UserMesocycle } from "./UserMesocycle";
import { Workout } from "./Workout";

@Entity()
export class Mesocycle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  length!: number;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => UserMesocycle, (userMesocycle) => userMesocycle.mesocycle)
  userMesocycles!: UserMesocycle[];

  @OneToMany(() => Workout, (workout) => workout.mesocycle)
  workouts!: Workout[];
}
