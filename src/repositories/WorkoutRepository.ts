// repositories/WorkoutRepository.ts
import { Repository, DataSource } from "typeorm";
import { Workout } from "../entities/Workout";

export class WorkoutRepository extends Repository<Workout> {
  constructor(dataSource: DataSource) {
    super(Workout, dataSource.manager);
  }

  // get workout by id
  async getWorkoutById(workoutId: string): Promise<Workout | null> {
    return this.findOne({
      where: { id: workoutId },
    });
  }

  // get all workouts
  async getAllWorkouts(): Promise<Workout[]> {
    return this.find();
  }
}