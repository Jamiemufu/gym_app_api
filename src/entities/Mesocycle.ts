// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | name          | varchar      |                               |
// | length        | integer      |                               |
// | workouts      | array        | References: public_workouts.id|
// | created_by    | UUID         | References: users.id          |

import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workout } from "./Workout";
import { User } from "./User";

@Entity()
export class Mesocycle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: false })
  length!: number;

  @JoinTable()
  @ManyToMany(() => Workout, workout => workout.id)
  workouts!: Workout[];

  @ManyToOne(() => User, user => user.id)
  created_by!: User;
}
