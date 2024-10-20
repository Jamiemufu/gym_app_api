import { Repository, DataSource, ILike, In } from "typeorm";
import { Workout } from "../entities/Workout";
import { validateRequest } from "../middleware/resourceValidator";
import { Exercise } from "../entities/Exercise";
import { ExerciseRepository } from "./ExerciseRepository";
import { AppDataSource } from "../config/ormconfig";
import { get } from "http";


export class WorkoutRepository extends Repository<Workout> {
  constructor(dataSource: DataSource) {
    super(Workout, dataSource.manager);
  }

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
    return await this.find({ relations: ["exercises"], where: { exercises: { name: ILike(exerciseName) } }});
  }

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

    workout.exercises = workout.exercises.filter(exercise => !exercisesToDelete.includes(exercise.id));
    return await this.save(workout);
  }

  /**
   * Update Workout Name
   * @param workoutId
   * @param name
   * @returns Workout | null
   * @throws Error
   */
  async updateWorkoutName(workoutId: string, name: string): Promise<Workout | null> {
    const workout = await this.findOneBy({ id: workoutId });

    if (!workout) {
      throw new Error("Workout not found");
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
  async updateWorkout(workoutId: string, name: string, exerciseIds: any): Promise<Workout | null> {
    const workout = await this.findOneBy({ id: workoutId });

    if (!workout) {
      throw new Error("Workout not found");
    }
    
    workout.name = name as string ?? workout.name;
    const exercises = await new ExerciseRepository(AppDataSource).find(exerciseIds);
    workout.exercises = exercises;
    await validateRequest(workout);
    return await this.save(workout);
  }
}