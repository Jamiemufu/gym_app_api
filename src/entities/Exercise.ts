// | Column         | Type         | Constraints                   |
// |----------------|--------------|-------------------------------|
// | id             | UUID         | Primary Key, Unique           |
// | name           | varchar      | Not Null                      |
// | muscle_group   | varchar      |                               |
// | equipment      | varchar      |                               |

import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";
import { UserWorkoutSet } from "./UserWorkoutSet";
@Entity()
export class Exercise {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false, unique: true })
    name!: string;

    @Column({ nullable: false })
    muscle_group!: string;

    @Column({ nullable: false })
    equipment!: string;
}
