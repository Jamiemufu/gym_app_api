import { DataSource, Repository } from "typeorm";
import { UserWorkout } from "../../entities/UserWorkout";
import { Workout } from "../../entities/Workout";

export class UserWorkoutBaseRepository extends Repository<UserWorkout> {
  constructor(dataSource: DataSource) {
    super(Workout, dataSource.manager);
  }
}