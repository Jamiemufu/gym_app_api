import { Repository, DataSource } from "typeorm";
import { User } from "../entities/User";

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  // get all users
  async getAllUsers(): Promise<User[]> {
    return this.find();
  }

  // get user by id
  async getUserById(userId: string): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
    });
  }

  // get user with mesocycles
  async getUserWithMesocycles(userId: string): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["mesocycles"],
    });
  }

  // get user with mesocycles and workouts
  async getUserWithMesocyclesAndWorkouts(userId: string): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["mesocycles", "mesocycles.workouts"],
    });
  }

  // get user with mesocycles, workouts, and user exercises
  async getUserWithMesocyclesWorkoutsAndUserExercises(userId: string): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["mesocycles", "mesocycles.workouts", "mesocycles.workouts.userExercises"],
    });
  }

  // get user with mesocycles, workouts, user exercises, and exercises
  async getUserWithMesocyclesWorkoutsUserExercisesAndExercises(userId: string): Promise<User | null> {
    return this.findOne({
      where: { id: userId },
      relations: ["mesocycles", "mesocycles.workouts", "mesocycles.workouts.userExercises", "mesocycles.workouts.userExercises.exercise"],
    });
  }

  // get all users with all related entities
  async getAllUsersWithAll(): Promise<User[]> {
    return this.find({
      relations: ["mesocycles", "mesocycles.workouts", "mesocycles.workouts.userExercises", "mesocycles.workouts.userExercises.exercise"],
    });
  }

}
