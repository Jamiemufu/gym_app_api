// | Column          | Type         | Constraints                   |
// |-----------------|--------------|-------------------------------|
// | id              | UUID         | Primary Key, Unique           |
// | username        | varchar      | Not Null, Unique              |
// | email           | varchar(255) | Not Null, Unique              |
// | password_hash   | varchar(255) | Not Null                      |
// | created_at      | timestamp    | Default: `now()`              |

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsString, Length } from "class-validator";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsString({ message: "Username must be a string" })
  @Length(3, 20, { message: "Username must be between 3 and 20 characters" })
  @Column({ nullable: false, unique: true })
  username!: string;

  @IsEmail()
  @Column({ nullable: false, unique: true })
  email!: string;

  @Length(5, 100, { message: "Password must be between 5 and 100 characters" })
  @Column({ nullable: false })
  password_hash!: string;

  @CreateDateColumn()
  created_at!: Date;
}
