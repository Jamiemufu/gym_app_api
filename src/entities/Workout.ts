// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | name          | varchar      |                               |
// | exercises     | array        | References: exercises.id      |
// | created_by    | UUID         | References: users.id          |
// | created_at    | timestamp    | Default: `now()`              |

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Exercise } from "./Exercise";
import { IsString } from "class-validator";
@Entity()
export class Workout {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsString()
  @Column({ nullable: false })
  name!: string;

  // Many workouts can have many exercises
  @JoinTable()
  @ManyToMany(() => Exercise, (exercise) => exercise.id)
  exercises!: Exercise[];

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  created_by!: User;
}
