import { Repository, DataSource, ILike } from "typeorm";
import { Exercise } from "../entities/Exercise";
import { validateRequest } from "../middleware/resourceValidator";

export class ExerciseRepository extends Repository<Exercise> {
  constructor(dataSource: DataSource) {
    super(Exercise, dataSource.manager);
  }

  /**
   * Get all Exercises
   * @returns Exercise[]
   */
  async getAllExercises(): Promise<Exercise[]> {
    return await this.find();
  }

  /**
   * Get Exercise by ID
   * @param exerciseId
   * @returns Exercise | null
   */
  async getExerciseById(exerciseId: string): Promise<Exercise | null> {
    return await this.findOneBy({ id: exerciseId });
  }

  /**
   * Get Exercise by Name
   * @param name
   * @returns Exercise | null
   */
  async getExerciseByName(name: string): Promise<Exercise[] | null> {
    return await this.findBy({ name: ILike(name) });
  }

  /**
   * Get Exercise by Type
   * @param type
   * @returns Exercise | null
   */
  async getExerciseByType(muscleGroup: string): Promise<Exercise[] | null> {
    return await this.findBy({ muscle_group: ILike(muscleGroup) });
  }

  /**
   * Get Exercise by Equipment
   * @param equipment
   * @returns Exercise | null
   */
  async getExerciseByEquipment(equipment: string): Promise<Exercise[]> {
    return await this.findBy({ equipment: ILike(equipment)});
  }

  /**
   * Update Exercise by ID
   * @param exerciseId
   * @param exercise
   * @returns Exercise
   * @throws Error
   */
  async updateExercise(exerciseId: string, name?: string, muscle_group?: string, equipment?: string): Promise<Exercise> {
    const exerciseToUpdate = await this.findOneBy({ id: exerciseId });

    if (!exerciseToUpdate) {
      throw new Error("Exercise not found");
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
    const exercise = await this.findOneBy({ id: exerciseId });

    if (!exercise) {
      throw new Error("Exercise not found");
    }

    return await this.remove(exercise);
  }
}