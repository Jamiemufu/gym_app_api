import { Repository, DataSource, ILike } from "typeorm";
import { Exercise } from "../entities/Exercise";

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
}