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
    const user3 = await this.createUser(queryRunner, "Jamiemufu", "test@email.com", "hashed_password_jamie");
    // Create Exercises
    const exercises = await Promise.all([
      this.createExercise(queryRunner, "Bench Press", "Chest", "Barbell"),
      this.createExercise(queryRunner, "Back Squat", "Legs", "Barbell"),
      this.createExercise(queryRunner, "Lateral Raise", "Shoulders", "Dumbbells"),
      this.createExercise(queryRunner, "Incline DB Press", "Chest", "Dumbbells"),
      this.createExercise(queryRunner, "Deadlift", "Back", "Barbell"),
      this.createExercise(queryRunner, "Smith Machine Incline Press", "Chest", "Smith Machine"),
      this.createExercise(queryRunner, "Cable Flyes", "Chest", "Cables"),
      this.createExercise(queryRunner, "Low to High Flyes", "Chest", "Cables"),
      this.createExercise(queryRunner, "High Cable Crossover", "Chest", "Cables"),
      this.createExercise(queryRunner, "Pullups", "Back", "Bodyweight"),
      this.createExercise(queryRunner, "Smith Machine Row (Reverse Grip)", "Back", "Smith Machine"),
      this.createExercise(queryRunner, "Lat Pulldown", "Back", "Cables"),
      this.createExercise(queryRunner, "Seated Row", "Back", "Cables"),
      this.createExercise(queryRunner, "Single Arm Cable Pulldown", "Back", "Cables"),
      this.createExercise(queryRunner, "Shrugs", "Back", "Dumbells"),
      this.createExercise(queryRunner, "Smith Machine Squat", "Legs", "Smith Machine"),
      this.createExercise(queryRunner, "Smith Narrow Squat", "Legs", "Smith Machine"),
      this.createExercise(queryRunner, "RDL", "Legs", "Smith Machine"),
      this.createExercise(queryRunner, "Calf Raises", "Legs", "Smith Machine"),
      this.createExercise(queryRunner, "Smith Shoulder Press", "Shoulders", "Smith Machine"),
      this.createExercise(queryRunner, "Front Raises", "Shoulders", "Cables"),
      this.createExercise(queryRunner, "DB Lateral Raises", "Shoulders", "Dumbellls"),
      this.createExercise(queryRunner, "Cable Lateral Raises", "Shoulders", "Cables"),
      this.createExercise(queryRunner, "Rear Delt Pulls", "Shoulders", "Cables"),
      this.createExercise(queryRunner, "Face Pulls", "Shoulders", "Cables"),
      this.createExercise(queryRunner, "Skull Crushers", "Triceps", "Smith Machine"),
      this.createExercise(queryRunner, "Tricep Pushdowns", "Triceps", "Cables"),
      this.createExercise(queryRunner, "Seated Overhead Extensions", "Triceps", "Cables"),
      this.createExercise(queryRunner, "Single Arm Pushdowns", "Triceps", "Cables"),
      this.createExercise(queryRunner, "Cable Curl", "Biceps", "Cables"),
      this.createExercise(queryRunner, "Stretched Cable Curl (Facing Away)", "Biceps", "Cables"),
      this.createExercise(queryRunner, "Reverse Grip Curl", "Biceps", "Cables"),
      this.createExercise(queryRunner, "Hammer Curl", "Biceps", "Cables"),
    ]);

    // Create Workouts
    const workout1 = await this.createWorkout(queryRunner, "Full Body Workout", exercises, user1);
    const workout2 = await this.createWorkout(queryRunner, "Upper Body Workout", [exercises[0], exercises[2]], user2);
    const workout3 = await this.createWorkout(queryRunner, "Chest Day", [exercises[0], exercises[5], exercises[6], exercises[7], exercises[8]], user3);
    const workout4 = await this.createWorkout(queryRunner, "Back Day", [exercises[10], exercises[11], exercises[12], exercises[13], exercises[14]], user3);
    const workout5 = await this.createWorkout(queryRunner, "Leg Day", [exercises[1], exercises[16], exercises[17], exercises[18]], user3);
    const workout6 = await this.createWorkout(queryRunner, "Shoulder Day", [exercises[20], exercises[21], exercises[22], exercises[23], exercises[24]], user3);
    const workout7 = await this.createWorkout(queryRunner, "Tricep Day", [exercises[25], exercises[26], exercises[27], exercises[28]], user3);
    const workout8 = await this.createWorkout(queryRunner, "Bicep Day", [exercises[29], exercises[30], exercises[31], exercises[32]], user3);

    // Create Mesocycles
    const mesocycle1 = await this.createMesocycle(queryRunner, "Beginner Mesocycle", 4, "cut", true, user1, [workout1, workout2], [user1]);
    const mesocycle2 = await this.createMesocycle(queryRunner, "Advanced Mesocycle", 6, "bulk", false, user2, [workout1], [user1, user2]);
    const mesocycle3 = await this.createMesocycle(queryRunner, "Op Massive", 3, "bulk", false, user3, [workout3, workout4, workout5, workout6, workout7, workout8], [user3]);

    // Create Mesocycle Days with rest and workout days
    // await this.createMesocycleDays(queryRunner, mesocycle1, workout1, workout2);
    // await this.createMesocycleDays(queryRunner, mesocycle2, workout1, null);

    // Create UserWorkout Instances
    const userWorkout3 = await this.createUserWorkout(queryRunner, user3, workout3);
    const userWorkout4 = await this.createUserWorkout(queryRunner, user3, workout4);
    const userWorkout5 = await this.createUserWorkout(queryRunner, user3, workout5);
    const userWorkout6 = await this.createUserWorkout(queryRunner, user3, workout6);
    const userWorkout7 = await this.createUserWorkout(queryRunner, user3, workout7);
    const userWorkout8 = await this.createUserWorkout(queryRunner, user3, workout8);

    // Create Sets for UserWorkouts
    const userWorkoutSet2 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[0], 1, 10, 70);
    const userWorkoutSet3 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[0], 2, 8, 70);
    const userWorkoutSet4 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[0], 3, 10, 60);
    const userWorkoutSet5 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[5], 1, 10, 80);
    const userWorkoutSet6 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[5], 2, 7, 80);
    const userWorkoutSet7 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[5], 3, 10, 70);
    const userWorkoutSet8 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[5], 4, 8, 70);
    const userWorkoutSet9 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[6], 1, 12, 10);
    const userWorkoutSet10 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[6], 2, 12, 10);
    const userWorkoutSet11 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[6], 3, 12, 10);
    const userWorkoutSet12 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[7], 1, 12, 0);
    const userWorkoutSet13 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[7], 2, 12, 0);
    const userWorkoutSet14 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[7], 3, 12, 0);
    const userWorkoutSet15 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[8], 1, 15, 10);
    const userWorkoutSet16 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[8], 2, 15, 10);
    const userWorkoutSet17 = await this.createUserWorkoutSet(queryRunner, userWorkout3, exercises[8], 3, 15, 10);

    // create UserWorkoutHistory
  //   const userWorkoutHistory = await this.createUserWorkoutHistory(queryRunner, user3, workout3, [userWorkoutSet2, userWorkoutSet3, userWorkoutSet4]);
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
  private async createMesocycle(queryRunner: QueryRunner, name: string, length: number, phase: string, periodization: boolean, created_by: User, workouts: Workout[], users: User[]) {
    const mesocycle = queryRunner.manager.create(Mesocycle, {
      name,
      length,
      created_by,
      phase,
      periodization,
      workouts,
      users,
    });
    return queryRunner.manager.save(mesocycle);
  }

  // Create Mesocycle Days with rest/workout days
  // private async createMesocycleDays(queryRunner: QueryRunner, mesocycle: Mesocycle, workout1: Workout | null, workout2: Workout | null) {
  //   const days = [
  //     queryRunner.manager.create(MesocycleDay, { mesocycle, dayNumber: 1, workout: workout1 || undefined, restDay: false }),
  //     queryRunner.manager.create(MesocycleDay, { mesocycle, dayNumber: 2, workout: undefined, restDay: true }),
  //     queryRunner.manager.create(MesocycleDay, { mesocycle, dayNumber: 3, workout: workout2 || undefined, restDay: false }),
  //   ];
  //   return queryRunner.manager.save(days);
  // }

  // Create UserWorkout record
  private async createUserWorkout(queryRunner: QueryRunner, user: User, workout: Workout) {
    const userWorkout = queryRunner.manager.create(UserWorkout, {
      user: user,
      workout: workout,
      date: new Date(),
    });
    return queryRunner.manager.save(userWorkout);
  }

  // Create UserWorkoutSet records
  private async createUserWorkoutSet(queryRunner: QueryRunner, userWorkout: UserWorkout, exercise: Exercise, setNumber: number, reps: number, weight: number) {
    const userWorkoutSet = queryRunner.manager.create(UserWorkoutSet, {
      set_number: setNumber,
      reps,
      weight,
      user_workout: userWorkout,
      exercise: exercise,
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
