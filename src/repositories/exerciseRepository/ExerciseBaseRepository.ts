import { Repository, DataSource } from "typeorm";
import { Exercise } from '../../entities/Exercise';

export class ExerciseBaseRepository extends Repository<Exercise> {
  constructor(dataSource: DataSource) {
    super(Exercise, dataSource.manager);
  }
}