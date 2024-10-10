import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities/User";
import { Mesocycle } from "../entities/Mesocycle";
import { Exercise } from "../entities/Exercise";
import { Workout } from "../entities/Workout";
import { UserExercise } from "../entities/UserExercise";

export class InitMigration1728471166704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Users
    const user1 = await this.createUser(queryRunner, "user1@example.com", "hashed_password_user1");
    const user2 = await this.createUser(queryRunner, "user2@example.com", "hashed_password_user2");

    // Create Mesocycle
    const mesocycle1 = await this.createMesocycle(queryRunner, "Beginner Mesocycle", 4, false, true);
    const mesocycle2 = await this.createMesocycle(queryRunner, "Intermediate Mesocycle", 4, true, false);

    // Link Users to Mesocycles
    await this.linkUserToMesocycle(queryRunner, user1, mesocycle1);
    await this.linkUserToMesocycle(queryRunner, user1, mesocycle2);

    // Create Exercises
    const exercises = await Promise.all([
      this.createExercise(queryRunner, "Bench Press", "Chest", "Barbell"),
      this.createExercise(queryRunner, "Back Squat", "Legs", "Barbell"),
      this.createExercise(queryRunner, "Lateral Raise", "Shoulders", "Cable"),
      this.createExercise(queryRunner, "Incline DB Press", "Chest", "Dumbbells"),
    ]);

    // Create User Exercises
    const userExercises = await Promise.all([
      this.createUserExercise(queryRunner, user1, exercises[0], 3, 10, 100),
      this.createUserExercise(queryRunner, user1, exercises[1], 3, 10, 100),
      this.createUserExercise(queryRunner, user1, exercises[2], 3, 10, 100),
      this.createUserExercise(queryRunner, user1, exercises[3], 3, 10, 100),
    ]);

    //TODO: Link UserExercises to Workouts

    // Create Workouts and Link Exercises
    const workout = await this.createWorkout(queryRunner, "Upper Body Workout", mesocycle1, exercises);

    // link mesocycle to workout
    // JoinTable is on workouts - so workouts is the owner side
    mesocycle1.workouts = [workout];
    await queryRunner.manager.save(mesocycle1);
  }

  private async createUser(queryRunner: QueryRunner, email: string, password_hash: string) {
    return queryRunner.manager.save(
      queryRunner.manager.create(User, {
        email,
        password_hash,
        created_at: new Date(),
      })
    );
  }

  // Create Mesocycle
  private async createMesocycle(queryRunner: QueryRunner, name: string, length: number, completed: boolean, active: boolean) {
    return queryRunner.manager.save(
      queryRunner.manager.create(Mesocycle, {
        name,
        length,
        completed,
        active,
        created_at: new Date(),
      })
    );
  }

  // Link User to Mesocycle
  private async linkUserToMesocycle(queryRunner: QueryRunner, user: User, mesocycle: Mesocycle) {
    user.mesocycles = user.mesocycles || [];
    user.mesocycles.push(mesocycle);

    await queryRunner.manager.save(user);
  }

  // Create Exercise
  private async createExercise(queryRunner: QueryRunner, name: string, muscleGroup: string, equipment: string) {
    return queryRunner.manager.create(Exercise, {
      name,
      muscleGroup,
      equipment,
    });
  }

  // Create User Exercise
  private async createUserExercise(queryRunner: QueryRunner, user: User, exercise: Exercise, sets: number, reps: number, weight: number) {
    return queryRunner.manager.save(
      queryRunner.manager.create(UserExercise, {
        user,
        exercise,
        sets,
        reps,
        weight,
        created_at: new Date(),
      })
    );
  }

  // Create Workout
  private async createWorkout(queryRunner: QueryRunner, name: string, mesocycle: Mesocycle, exercises: Exercise[]) {
    return queryRunner.manager.save(
      queryRunner.manager.create(Workout, {
        name,
        exercises,
        created_at: new Date(),
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove UserExercises
    await queryRunner.manager.delete(UserExercise, {});
    // Remove Workouts
    await queryRunner.manager.delete(Workout, {});
    // Remove Exercises
    await queryRunner.manager.delete(Exercise, {});
    // Remove Users
    await queryRunner.manager.delete(User, {});
    // Remove Mesocycles
    await queryRunner.manager.delete(Mesocycle, {});
  }
}
