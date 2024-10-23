import { UserLog } from "../../entities/UserLog";
import { UserLogBaseRepository } from "./UserLogBaseRepository";
import { UserWorkoutGetters } from "../userWorkoutRepository/UserWorkoutGetters";
import { AppDataSource } from "../../config/ormconfig";
import { UserWorkout } from "../../entities/UserWorkout";
import { Equal } from "typeorm";

export class UserLogGetters extends UserLogBaseRepository {
  /**
   * Get all UserLogs
   * @returns UserLog[]
   * @throws Error
   */
  async getAllUserLogs(): Promise<UserLog[]> {
    return await this.find({
      relations: ["exercise", "user_workout"],
    });
  }

  /**
   * Get UserLogs by User ID
   * @param userId
   * @returns UserLog[]
   * @throws Error
   */
  async getUserLogsByUserId(userId: string): Promise<UserLog[]> {
    return await this.find({
      where: {
        user_workout: {
          user: { id: userId },
        },
      },
      relations: ["exercise", "user_workout", "user_workout.user"],
    });
  }

  /** get user log by userworkout
   * @param userWorkoutId
   * @returns UserLog[]
   * @throws Error
   */
  async getUserLogsByUserWorkoutId(userWorkoutId: string): Promise<UserLog[]> {
    return await this.find({
      where: { user_workout: Equal(userWorkoutId) },
      relations: ["exercise", "user_workout"],
    });
  }

  /**
   * Get user logs by exercise
   * @param exerciseId
   * @returns UserLog[]
   * @throws Error
   */
  async getUserLogsByExerciseId(exerciseId: string): Promise<UserLog[]> {
    return await this.find({
      where: { exercise: Equal(exerciseId) },
      relations: ["exercise"],
    });
  }
}
