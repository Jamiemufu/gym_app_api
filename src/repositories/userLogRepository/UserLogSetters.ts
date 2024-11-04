import { UserLog } from "../../entities/UserLog";
import { UserLogBaseRepository } from "./UserLogBaseRepository";
import { UserWorkout } from '../../entities/UserWorkout';
import { ExerciseGetters } from "../exerciseRepository/ExerciseGetters";
import { UserWorkoutSetters } from "../userWorkoutRepository/UserWorkoutSetters";
import { Exercise } from "../../entities/Exercise";

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
    const userWorkout: UserWorkout = await new UserWorkoutSetters(this.manager.connection).createUserWorkout(userId, workoutId);
    
    if (!userWorkout) {
      throw new Error("User workout not found");
    }

    const userExercises: Exercise[] = userWorkout.workout.exercises;
     // check if exercise belongs to the workout
     if (!userExercises.find((ex) => ex.id === exerciseId)) {
      throw new Error("Exercise does not belong to the workout");
    }

    // get exercise for user log associated with user workout
    const exercise: Exercise | null = await new ExerciseGetters(this.manager.connection).getExerciseById(exerciseId);
    
    if (!exercise) {
      throw new Error("Exercise not found");
    }

    // create new user log with userWorkout and Exericse association
    // allow for 0's in reps, sets, and weight to be logged for "skip" or "rest" days
    const userLog = new UserLog();
    userLog.user_workout = userWorkout;
    userLog.exercise = exercise;
    userLog.reps = reps;
    userLog.set_number = sets;
    userLog.weight = weight;

    return await this.save(userLog);
  }
}