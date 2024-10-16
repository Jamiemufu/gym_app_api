// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | user_id       | UUID         | References: users.id          |
// | workout_id    | UUID         | References: public_workouts.id |
// | date          | timestamp    |                               |

import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
export class UserWorkout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({nullable: false})
  @ManyToOne(() => User, user => user.id)
  user_id!: string;

  @Column({nullable: false})
  @ManyToOne(() => Workout, workout => workout.id)
  workout_id!: string;

  @CreateDateColumn()
  date!: Date;
}