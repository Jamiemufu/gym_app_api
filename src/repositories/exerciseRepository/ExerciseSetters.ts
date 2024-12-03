import { AppDataSource } from "../../config/ormconfig";
import { Exercise } from "../../entities/Exercise";
import { validateRequest } from "../../middleware/requestValidator";
import { ExerciseBaseRepository } from "./ExerciseBaseRepository";
import { ExerciseGetters } from "./ExerciseGetters";

export class ExerciseSetters extends ExerciseBaseRepository {

  exerciseGetters = new ExerciseGetters(AppDataSource);

  /**
   * Update Exercise by ID
   * @param exerciseId
   * @param exercise
   * @returns Exercise
   * @throws Error
   */
  async updateExercise(exerciseId: string, name?: string, muscle_group?: string, equipment?: string): Promise<Exercise> {
    
    if (!name && !muscle_group && !equipment) {
      throw new Error("Nothing to update");
    }

    const exerciseToUpdate = await this.exerciseGetters.getExerciseById(exerciseId);

    if (!exerciseToUpdate) {
      throw new Error("Exercise not found");
    }

    if (exerciseToUpdate?.name === name && exerciseToUpdate?.muscle_group === muscle_group && exerciseToUpdate?.equipment === equipment) {
      throw new Error("Nothing to update");
    }

    exerciseToUpdate.name = name ?? exerciseToUpdate.name;
    exerciseToUpdate.muscle_group = muscle_group ?? exerciseToUpdate.muscle_group;
    exerciseToUpdate.equipment = equipment ?? exerciseToUpdate.equipment;

    await validateRequest(exerciseToUpdate);

    return await this.save(exerciseToUpdate);
  }

  /**
   * Create Exercise
   * @param name
   * @param muscle_group
   * @param equipment
   * @returns Exercise
   */
  async createExercise(name: string, muscle_group: string, equipment: string): Promise<Exercise> {
    const exercise = new Exercise();
    exercise.name = name;
    exercise.muscle_group = muscle_group;
    exercise.equipment = equipment;

    await validateRequest(exercise);

    return await this.save(exercise);
  }

  /**
   * Delete Exercise
   * @param exerciseId
   * @returns void
   * @throws Error
   */
  async deleteExercise(exerciseId: string): Promise<Exercise> {
    const exercise = await this.exerciseGetters.getExerciseById(exerciseId);

    if (!exercise) {
      throw new Error("Exercise not found");
    }

    return await this.remove(exercise);
  }
}
