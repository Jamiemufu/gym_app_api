// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | mesocycle_id  | UUID         | References: mesocycles.id     |
// | day_number    | integer      |                               |
// | workout_id    | UUID         | Nullable, References: public_workouts.id |
// | rest_day      | boolean      |                               |

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Mesocycle } from "./Mesocycle";
import { Workout } from "./Workout";

@Entity("mesocycle_days")
export class MesocycleDay {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Mesocycle, (mesocycle) => mesocycle.id)
  mesocycle!: Mesocycle;

  @Column()
  dayNumber!: number;

  @ManyToOne(() => Workout, (workout) => workout.id)
  workout!: Workout;

  @Column({ default: false })
  restDay!: boolean;
}