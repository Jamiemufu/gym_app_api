import { UserLog } from "../../entities/UserLog";
import { UserLogBaseRepository } from "./UserLogBaseRepository";
import { UserWorkout } from '../../entities/UserWorkout';
import { ExerciseGetters } from "../exerciseRepository/ExerciseGetters";
import { UserWorkoutSetters } from "../userWorkoutRepository/UserWorkoutSetters";

export class UserLogSetters extends UserLogBaseRepository {
  /**
   * Create new userlog
   * @param userWorkoutId
   * @param exerciseId
   * @param reps
   * @param sets
   * @param weight
   * @returns UserLog
   * @throws Error
   */
  async createUserLog(userId: string, workoutId: string, exerciseId: string, reps: number, sets: number, weight: number): Promise<UserLog> {
    // create new userworkout based on workout logging
    const userWorkout = await new UserWorkoutSetters(this.manager.connection).createUserWorkout(userId, workoutId);

    // We have access to exercises via workout ID, but still need a way to get the exercise in the backend
    // We should really select the exercise associated with the workout or ensure that the exercise is associated with the workout
    // get exercise for user log associated with user workout
    const exercise = await new ExerciseGetters(this.manager.connection).getExerciseById(exerciseId);

    if (!userWorkout) {
      throw new Error("User workout not found");
    }

    if (!exercise) {
      throw new Error("Exercise not found");
    }

    // create new user log with userWorkout and Exericse association
    const userLog = new UserLog();
    userLog.user_workout = userWorkout;
    userLog.exercise = exercise;
    userLog.reps = reps;
    userLog.set_number = sets;
    userLog.weight = weight;

    return await this.save(userLog);
  }
}