// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | name          | varchar      |                               |
// | length        | integer      |                               |
// | workouts      | array        | References: public_workouts.id|
// | created_by    | UUID         | References: users.id          |

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsNumber, IsBoolean } from "class-validator";
import { Workout } from "./Workout";
import { User } from "./User";

@Entity()
export class Mesocycle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsString()
  @Column({ nullable: false })
  name!: string;

  @IsNumber()
  @Column({ nullable: false })
  length!: number;

  @IsString()
  @Column({ nullable: true })
  phase!: string;

  @IsBoolean()
  @Column({ default: false })
  periodization!: boolean;

  // mesocycles owns join table with workouts
  @ManyToMany(() => Workout, (workout) => workout.id)
  @JoinTable()
  workouts!: Workout[];

  @ManyToOne(() => User, (user) => user.id)
  created_by!: User;

  // mesocycle owns join table with users
  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  users!: User[];
}
