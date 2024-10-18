// | Column         | Type         | Constraints                   |
// |----------------|--------------|-------------------------------|
// | id             | UUID         | Primary Key, Unique           |
// | name           | varchar      | Not Null                      |
// | muscle_group   | varchar      |                               |
// | equipment      | varchar      |                               |

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString } from "class-validator";
@Entity()
export class Exercise {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @IsString()
    @Column({ nullable: false, unique: true })
    name!: string;

    @IsString()
    @Column({ nullable: false })
    muscle_group!: string;

    @IsString()
    @Column({ nullable: false })
    equipment!: string;
}
