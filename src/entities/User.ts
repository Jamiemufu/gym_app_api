// import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm";
// import { Mesocycle } from "./Mesocycle";
// import { UserExercise } from "./UserExercise";

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;

//   @Column()
//   email!: string;

//   @Column()
//   password_hash!: string;

//   @CreateDateColumn()
//   created_at!: Date;

//   // Mesocycle Link
//   @ManyToMany(() => Mesocycle, (mesocycle: Mesocycle) => mesocycle.users, { cascade: true })
//   @JoinTable()
//   mesocycles!: Mesocycle[];

//   @OneToMany(() => UserExercise, (userExercise: UserExercise) => userExercise.user)
//   userExercises!: UserExercise[];
// }

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {

@PrimaryGeneratedColumn("uuid")
  id!: string;
  
  @Column({ nullable: false, unique: true })
  username!: string;
  
  @Column({ nullable: false, unique: true })
  email!: string;

  @Column( { nullable: false })
  password_hash!: string;

  @CreateDateColumn()
  created_at!: Date;
}
