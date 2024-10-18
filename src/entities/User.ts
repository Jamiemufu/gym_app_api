// | Column          | Type         | Constraints                   |
// |-----------------|--------------|-------------------------------|
// | id              | UUID         | Primary Key, Unique           |
// | username        | varchar      | Not Null, Unique              |
// | email           | varchar(255) | Not Null, Unique              |
// | password_hash   | varchar(255) | Not Null                      |
// | created_at      | timestamp    | Default: `now()`              |

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  IsEmail,
  IsString,
} from "class-validator";
@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @IsString()
  @Column({ nullable: false, unique: true })
  username!: string;
  
  @IsEmail()
  @Column({ nullable: false, unique: true })
  email!: string;

  @Column( { nullable: false })
  password_hash!: string;

  @CreateDateColumn()
  created_at!: Date;
}
