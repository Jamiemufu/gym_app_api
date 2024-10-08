import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Group } from "./Group";

@Entity()
export class GroupChallenge {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Group, (group) => group.challenges, { nullable: false })
  group!: Group;

  @Column()
  name!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;

  @CreateDateColumn()
  created_at!: Date;
}
