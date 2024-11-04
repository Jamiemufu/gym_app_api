import { ILike } from "typeorm";
import { Workout } from "../../entities/Workout";
import { WorkoutBaseRepository } from "./WorkoutBaseRepository";

export class WorkoutGetters extends WorkoutBaseRepository {
  
  /**
   * Get all Workouts
   * @returns Workout[]
   */
  async getAllWorkouts(): Promise<Workout[]> {
    return await this.find();
  }

  /**
   * Get Workouts and Exercises
   * @returns Workout[]
   */
  async getWorkoutsAndExercises(): Promise<Workout[]> {
    return await this.find({ relations: ["exercises"] });
  }

  /**
   * Get Workout by ID
   * @param workoutId
   * @returns Workout | null
   */
  async getWorkoutById(workoutId: string): Promise<Workout | null> {
    if (!workoutId) {
      throw new Error("Workout ID is required");
    }
    
    return await this.findOneBy({ id: workoutId });
  }

  /**
   * Get Workout Exercises
   * @param workoutId
   * @returns Workout | null
   */
  async getWorkoutExercises(workoutId: string): Promise<Workout | null> {
    return await this.findOne({ where: { id: workoutId }, relations: ["exercises"] });
  }

  /**
   * Get Workout by Name
   * @param name
   * @returns Workout | null
   * @throws Error
   */
  async getWorkoutByName(name: string): Promise<Workout | null> {
    return await this.findOneBy({ name: ILike(name) });
  }

  /**
   * Get Workouts by Exercise ID
   * @param exerciseId
   * @returns Workout[] | null
   * @throws Error
   */
  async getWorkoutsByExerciseId(exerciseId: string): Promise<Workout[] | null> {
    return await this.find({ relations: ["exercises"], where: { exercises: { id: exerciseId } } });
  }

  /**
   * Get Workout by Exercise Name
   * @param exerciseName
   * @returns Workout[] | null
   * @throws Error
   */
  async getWorkoutsByExerciseName(exerciseName: string): Promise<Workout[] | null> {
    return await this.find({ relations: ["exercises"], where: { exercises: { name: ILike(exerciseName) } } });
  }
}
