// repositories/WorkoutRepository.ts
import { Repository, DataSource } from "typeorm";
import { Workout } from "../entities/Workout";
import { UserExercise } from "../entities/UserExercise";

export class WorkoutRepository extends Repository<Workout> {
  constructor(dataSource: DataSource) {
    super(Workout, dataSource.manager);
  }

  // Retrieve a workout with all associated user exercises
  async getWorkoutWithUserExercises(workoutId: string): Promise<Workout | null> {
    return this.findOne({
      where: { id: workoutId },
      relations: ["userExercises"],
    });
  }

  // Retrieve all workouts with their associated user exercises
  async getAllWorkoutsWithUserExercises(): Promise<Workout[]> {
    return this.find({ relations: ["userExercises"] });
  }
}
