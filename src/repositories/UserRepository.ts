import { Repository, DataSource } from "typeorm";
import { User } from "../entities/User";

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  // get all users
  async getAllUsers(): Promise<User[]> {
    return this.find({
        relations: [
          "mesocycles",
          "mesocycles.workouts",
          "mesocycles.workouts.userExercises",
          "mesocycles.workouts.userExercises.exercise",
        ],
    });
  }

  // get user with ALL related entities
  async getUserWithAll(userId: number): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["mesocycles", "mesocycles.workouts", "userExercises"],
    });
  }

  // Retrieve a user with all associated user exercises
  async getUserWithUserExercises(userId: number): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["userExercises"],
    });
  }

  // Retrieve all users with their associated user exercises
  async getAllUsersWithUserExercises(): Promise<User[]> {
    return this.find({ relations: ["userExercises"] });
  }
}
