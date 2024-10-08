import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Group } from "./Group";

@Entity()
export class GroupProgressReport {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Group, (group) => group.progressReports, { nullable: false })
  group!: Group;

  @CreateDateColumn()
  report_date!: Date;

  @Column("text")
  summary!: string;
}
