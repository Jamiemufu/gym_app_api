import { DataSource, Repository } from "typeorm";
import { UserWorkout } from "../../entities/UserWorkout";

export class UserWorkoutBaseRepository extends Repository<UserWorkout> {
  constructor(dataSource: DataSource) {
    super(UserWorkout, dataSource.manager);
  }
}