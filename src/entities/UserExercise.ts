import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinTable } from "typeorm";
import { Exercise } from "./Exercise";
import { User } from "./User";

@Entity()
export class UserExercise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column("float")
  weight!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.userExercises)
  user!: User;

  @OneToOne(() => Exercise, (exercise) => exercise.userExercises)
  exercise!: Exercise;
}
