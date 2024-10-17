import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/User";
import { Mesocycle } from "../entities/Mesocycle";
import { Exercise } from "../entities/Exercise";
import { Workout } from "../entities/Workout";
import { UserWorkout } from "../entities/UserWorkout";
import { UserWorkoutSet } from "../entities/UserWorkoutSet";
import { MesocycleDay } from "../entities/MesocycleDay";

export class InitMigration1728471166704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Users
    const user1 = await this.createUser(queryRunner, "user1", "user1@example.com", "hashed_password_user1");
    const user2 = await this.createUser(queryRunner, "user2", "user2@example.com", "hashed_password_user2");

    // Create Exercises
    const exercises = await Promise.all([
      this.createExercise(queryRunner, "Bench Press", "Chest", "Barbell"),
      this.createExercise(queryRunner, "Back Squat", "Legs", "Barbell"),
      this.createExercise(queryRunner, "Lateral Raise", "Shoulders", "Dumbbells"),
      this.createExercise(queryRunner, "Incline DB Press", "Chest", "Dumbbells"),
    ]);

    // Create Workouts
    const workout1 = await this.createWorkout(queryRunner, "Full Body Workout", exercises, user1);
    const workout2 = await this.createWorkout(queryRunner, "Upper Body Workout", [exercises[0], exercises[2]], user2);

    // Create Mesocycles
    const mesocycle1 = await this.createMesocycle(queryRunner, "Beginner Mesocycle", 4, user1, [workout1, workout2], [user1]);
    const mesocycle2 = await this.createMesocycle(queryRunner, "Advanced Mesocycle", 6, user2, [workout1], [user1, user2]);

    // Create Mesocycle Days with rest and workout days
    await this.createMesocycleDays(queryRunner, mesocycle1, workout1, workout2);
    await this.createMesocycleDays(queryRunner, mesocycle2, workout1, null);

    // Create UserWorkout Instances
    const userWorkout1 = await this.createUserWorkout(queryRunner, user1, workout1);
    const userWorkout2 = await this.createUserWorkout(queryRunner, user2, workout2);

    // Create Sets for UserWorkouts
    await this.createUserWorkoutSet(queryRunner, userWorkout1, exercises[0], 1, 10, 100);
    await this.createUserWorkoutSet(queryRunner, userWorkout1, exercises[1], 2, 8, 150);
    await this.createUserWorkoutSet(queryRunner, userWorkout2, exercises[2], 1, 12, 40);
  }

  // Helper Functions to create entities and populate relationships

  // Create User
  private async createUser(queryRunner: QueryRunner, username: string, email: string, password_hash: string) {
    const user = queryRunner.manager.create(User, {
      username,
      email,
      password_hash,
      created_at: new Date(),
    });
    return queryRunner.manager.save(user);
  }

  // Create Exercise
  private async createExercise(queryRunner: QueryRunner, name: string, muscle_group: string, equipment: string) {
    const exercise = queryRunner.manager.create(Exercise, {
      name,
      muscle_group,
      equipment,
    });
    return queryRunner.manager.save(exercise);
  }

  // Create Workout and associate Exercises
  private async createWorkout(queryRunner: QueryRunner, name: string, exercises: Exercise[], created_by: User) {
    const workout = queryRunner.manager.create(Workout, {
      name,
      exercises,
      created_by,
      created_at: new Date(),
    });
    return queryRunner.manager.save(workout);
  }

  // Create Mesocycle and associate Workouts
  private async createMesocycle(queryRunner: QueryRunner, name: string, length: number, created_by: User, workouts: Workout[], users: User[]) {
    const mesocycle = queryRunner.manager.create(Mesocycle, {
      name,
      length,
      created_by,
      workouts,
      users,
    });
    return queryRunner.manager.save(mesocycle);
  }

  // Create Mesocycle Days with rest/workout days
  private async createMesocycleDays(queryRunner: QueryRunner, mesocycle: Mesocycle, workout1: Workout | null, workout2: Workout | null) {
    const days = [
      queryRunner.manager.create(MesocycleDay, { mesocycle, dayNumber: 1, workout: workout1 || undefined, restDay: false }),
      queryRunner.manager.create(MesocycleDay, { mesocycle, dayNumber: 2, workout: undefined, restDay: true }),
      queryRunner.manager.create(MesocycleDay, { mesocycle, dayNumber: 3, workout: workout2 || undefined, restDay: false }),
    ];
    return queryRunner.manager.save(days);
  }

  // Create UserWorkout record
  private async createUserWorkout(queryRunner: QueryRunner, user: User, workout: Workout) {
    const userWorkout = queryRunner.manager.create(UserWorkout, {
      user_id: user.id,
      workout_id: workout.id,
      date: new Date(),
    });
    return queryRunner.manager.save(userWorkout);
  }

  // Create UserWorkoutSet records
  private async createUserWorkoutSet(queryRunner: QueryRunner, userWorkout: UserWorkout, exercise: Exercise, setNumber: number, reps: number, weight: number) {
    const userWorkoutSet = queryRunner.manager.create(UserWorkoutSet, {
      user_workout_id: userWorkout.id,
      exercise_id: exercise.id,
      set_number: setNumber,
      reps,
      weight,
    });
    return queryRunner.manager.save(userWorkoutSet);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(UserWorkoutSet, {});
    await queryRunner.manager.delete(UserWorkout, {});
    await queryRunner.manager.delete(MesocycleDay, {});
    await queryRunner.manager.delete(Mesocycle, {});
    await queryRunner.manager.delete(Workout, {});
    await queryRunner.manager.delete(Exercise, {});
    await queryRunner.manager.delete(User, {});
  }
}
