import { User } from "../../entities/User";
import { UserWorkout } from "../../entities/UserWorkout";
import { Workout } from "../../entities/Workout";
import { UserWorkoutBaseRepository } from "./UserWorkoutBaseRepository";

export class UserWorkoutSetters extends UserWorkoutBaseRepository {
  /**
   * Add Workout and User to UserWorkout
   * @param user
   * @param workout
   * @returns UserWorkout
   * @throws Error
   */
  async addUserWorkout(userId: string, workoutId: string): Promise<UserWorkout> {
    const user = await this.manager.findOneBy(User, { id: userId });
    const workout = await this.manager.findOneBy(Workout, { id: workoutId });

    if (!user) {
      throw new Error("User not found");
    }

    if (!workout) {
      throw new Error("Workout not found");
    }

    const userWorkout = new UserWorkout();
    userWorkout.user = user;
    userWorkout.workout = workout;

    return await this.save(userWorkout);
  }

  /**
   * Delete a user workout
   * @param userWorkoutId
   * @returns void
   * @throws Error
   */
  async deleteUserWorkout(userWorkoutId: string): Promise<UserWorkout> {
    const userWorkout = await this.findOneBy({ id: userWorkoutId });

    if (!userWorkout) {
      throw new Error("User workout not found");
    }

    return await this.remove(userWorkout);
  }
}

