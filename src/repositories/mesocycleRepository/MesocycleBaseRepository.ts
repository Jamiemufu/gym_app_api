import { Repository, DataSource } from "typeorm";
import { Mesocycle } from "../../entities/Mesocycle";

export class MesocycleBaseRepository extends Repository<Mesocycle> {
  constructor(dataSource: DataSource) {
    super(Mesocycle, dataSource.manager);
  }
}
