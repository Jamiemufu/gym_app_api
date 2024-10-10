
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable
} from "typeorm";

import { Mesocycle } from "./Mesocycle";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column()
  email!: string;

  @Column()
  password_hash!: string;

  @CreateDateColumn()
  created_at!: Date;

  // Mesocycle Link
  @ManyToMany(() => Mesocycle, (mesocycle: Mesocycle) => mesocycle.users, { cascade: true })
  @JoinTable()
  mesocycles!: Mesocycle[];
}
