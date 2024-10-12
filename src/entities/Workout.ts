// import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
// import { Mesocycle } from "./Mesocycle";
// import { Exercise } from "./Exercise";
// import { UserExercise } from "./UserExercise";

// @Entity()
// export class Workout {
//   @PrimaryGeneratedColumn("uuid")
//   id!: string;
  
//   @Column()
//   name!: string;

//   @CreateDateColumn()
//   created_at!: Date;

//   @ManyToMany(() => Mesocycle, (mesocycle: Mesocycle) => mesocycle.workouts)
//   @JoinTable()
//   mesocycle!: Mesocycle[];

//   // Many workouts can have many userExercises
//   @ManyToMany(() => UserExercise, (userExercise: UserExercise) => userExercise.workouts)
//   @JoinTable()
//   userExercises!: UserExercise[];
// }

// ### Public Workouts Table
// | Column        | Type         | Constraints                   |
// |---------------|--------------|-------------------------------|
// | id            | UUID         | Primary Key, Unique           |
// | name          | varchar      |                               |
// | exercises     | array        | References: exercises.id      |
// | created_by    | UUID         | References: users.id          |
// | created_at    | timestamp    | Default: `now()`              |

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./User";
import { Exercise } from "./Exercise";
@Entity()
export class Workout {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false })
    name!: string;

    @CreateDateColumn()
    created_at!: Date;

    // Many workouts can one user (created_by)
    @ManyToOne(() => User, user => user.id)
    created_by!: User;

    // Many workouts can have many exercises
    @ManyToMany(() => Exercise, exercise => exercise.id)
    exercises!: Exercise[];
}