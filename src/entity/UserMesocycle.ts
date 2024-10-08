import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Mesocycle } from "./Mesocycle";
import { Group } from "./Group";

@Entity()
export class UserMesocycle {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.userMesocycles, { nullable: false })
  user: User = new User();

  @ManyToOne(() => Mesocycle, (mesocycle) => mesocycle.userMesocycles, {
    nullable: false,
  })
  mesocycle: Mesocycle = new Mesocycle();

  @Column()
  phase!: string;

  @Column()
  intensity!: string;

  @ManyToOne(() => Group, (group) => group.id, { nullable: false })
  group: Group = new Group();

  @CreateDateColumn()
  created_at!: Date;
}
