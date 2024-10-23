// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | user_id       | UUID         | References: users.id          |
// | workout_id    | UUID         | References: public_workouts.id |
// | date          | timestamp    |                               |

import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
export class UserWorkout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  user!: User;

  @ManyToOne(() => Workout, (workout) => workout.id, { cascade: true })
  workout!: Workout;

  @CreateDateColumn()
  date!: Date;
}