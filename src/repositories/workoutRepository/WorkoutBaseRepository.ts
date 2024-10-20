import { Repository, DataSource } from "typeorm";
import { Workout } from "../../entities/Workout";

export class WorkoutBaseRepository extends Repository<Workout> {
  constructor(dataSource: DataSource) {
    super(Workout, dataSource.manager);
  }
}
