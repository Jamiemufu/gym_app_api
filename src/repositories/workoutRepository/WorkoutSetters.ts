import { In, ILike } from "typeorm";
import { AppDataSource } from "../../config/ormconfig";
import { Workout } from "../../entities/Workout";
import { validateRequest } from "../../middleware/resourceValidator";
import { ExerciseGetters } from "../exerciseRepository/ExerciseGetters";
import { WorkoutBaseRepository } from "./WorkoutBaseRepository";

export class WorkoutSetters extends WorkoutBaseRepository {
  /**
   * Remove Workout by ID
   * @param workoutId
   * @returns void
   * @throws Error
   */
  async removeWorkoutById(workoutId: string): Promise<void> {
    const workout = await this.findOneBy({ id: workoutId });

    if (!workout) {
      throw new Error("Workout not found");
    }

    await this.remove(workout);
  }

  /**
   * Remove Exercises from Workout
   * @param workoutId
   * @param exerciseIds
   * @returns Workout | null
   * @throws Error
   */
  async removeExercisesFromWorkout(workoutId: string, exercisesToDelete: string): Promise<Workout | null> {
    const workout = await this.findOne({ where: { id: workoutId }, relations: ["exercises"] });

    if (!workout) {
      throw new Error("Workout not found");
    }

    workout.exercises = workout.exercises.filter((exercise) => !exercisesToDelete.includes(exercise.id));
    return await this.save(workout);
  }

  /**
   * Remove ALL Exercises from Workout
   * @param workoutId
   * @returns Workout | null
   * @throws Error
   * @returns Workout | null
   */
  async removeAllExercisesFromWorkout(workoutId: string): Promise<Workout | null> {
    const workout = await this.findOne({ where: { id: workoutId }, relations: ["exercises"] });

    if (!workout) {
      throw new Error("Workout not found");
    }

    workout.exercises = [];
    return await this.save(workout);
  }

  /**
   * Create Workout
   * @param name
   * @param exercises
   * @returns Workout
   * @throws Error
   */
  async createWorkout(name: string, exerciseIds: string[]): Promise<Workout> {
    const workout = new Workout();
    workout.name = name;

    // get exercises by id
    const exercises = await new ExerciseGetters(AppDataSource).find({ where: { id: In(exerciseIds) } });
    workout.exercises = exercises;

    await validateRequest(workout);
    return await this.save(workout);
  }

  /**
   * Update Workout Name
   * @param workoutId
   * @param name
   * @returns Workout | null
   * @throws Error
   */
  async updateWorkoutName(workoutId: string, name: string): Promise<Workout | Error> {
    const workout = await this.findOneBy({ id: workoutId });

    if (!workout) {
      return Error("Workout not found");
    }

    if (name && name.toLowerCase() === workout.name.toLowerCase()) {
      return Error("Nothing to update");
    }

    workout.name = name;

    await validateRequest(workout);

    return await this.save(workout);
  }

  /**
   * Update Workout
   * @param workoutId
   * @param name
   * @param exercises
   * @returns Workout | null
   * @throws Error
   */
  async updateWorkout(workoutId: string, exerciseIds: string[], name?: string): Promise<Workout | Error> {
    const workout = await this.findOne({ where: { id: workoutId }, relations: ["exercises"] });

    if (!workout) {
      return Error("Workout not found");
    }

    if (!name && exerciseIds.length === 0) {
      return Error("Nothing to update");
    }

    if (exerciseIds.length > 0) {
      const exercises = await new ExerciseGetters(AppDataSource).find({ where: { id: In(exerciseIds) } });
      workout.exercises.push(...exercises);
    }

    await validateRequest(workout);
    return await this.save(workout);
  }
}
