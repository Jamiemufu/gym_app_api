// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | name          | varchar      |                               |
// | length        | integer      |                               |
// | workouts      | array        | References: public_workouts.id|
// | created_by    | UUID         | References: users.id          |

import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsNumber, IsBoolean, Length } from 'class-validator';
import { Workout } from "./Workout";
import { User } from "./User";

@Entity()
export class Mesocycle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsString()
  @Length(5, 55, { message: "Name must be between 5 and 55 characters" })
  @Column({ nullable: false })
  name!: string;

  @IsNumber()
  @Column({ nullable: false })
  length!: number;

  @IsString()
  @Column({ nullable: true })
  @Length(0, 10, { message: "Phase must be between 0 and 10 characters" })
  phase!: string

  @IsBoolean()
  @Column({ default: false })
  periodization!: boolean;

  // mesocycles owns join table with workouts
  @ManyToMany(() => Workout, (workout) => workout.id)
  @JoinTable()
  workouts!: Workout[];

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  created_by!: User;

  // mesocycle owns join table with users
  @ManyToMany(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinTable()
  users!: User[];
}
