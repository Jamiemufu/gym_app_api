import { UserWorkout } from '../../entities/UserWorkout';
import { UserWorkoutBaseRepository } from './UserWorkoutBaseRepository';
export class UserWorkoutGetters extends UserWorkoutBaseRepository {

  /**
   * Find UserWorkout by ID
   * @param userWorkoutId
   * @returns UserWorkout | null
   */
  async getUserWorkoutById(userWorkoutId: string): Promise<UserWorkout | null> {
    return await this.findOneBy({ id: userWorkoutId });
  }

  /** 
   * get all UserWorkouts
   * @returns UserWorkout[]
   */
  async getAllUserWorkouts(): Promise<UserWorkout[]> {
    return await this.find();
  }

  /**
   * Get all user workouts with relations
   * @returns UserWorkout[]
   * @throws Error
   */
  async getAllUserWorkoutsWithRelations(): Promise<UserWorkout[]> {
    return await this.find({ relations: ['user', 'workout'] });
  }

  //TODO: Test below functions
  /**
   * 
   * @param userId
   * @returns UserWorkout[]
   * @throws Error
   */
  async getUserWorkoutByIdWithRelations(workoutId: string): Promise<UserWorkout | null> {
    return await this.findOne({ where: { id: workoutId }, relations: ["user", "workout"] });
  }

  /**
   * Get UserWorkout by User ID
   * @param userId
   * @returns Error
   */
  async getUserWorkoutByUserId(userId: string): Promise<UserWorkout | null> {
    return await this.findOne({ where: { user: { id: userId } } });
  }

  /**
   * Get userWorkout by workout ID
   * @param workoutId
   * @returns UserWorkout | null
   * @throws Error
   */
  async getUserWorkoutByWorkoutId(workoutId: string): Promise<UserWorkout | null> {
    return await this.findOne({ where: { workout: { id: workoutId } } });
  }
}