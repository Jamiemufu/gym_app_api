import { DataSource, Repository } from "typeorm";
import { UserLog } from "../../entities/UserLog";

export class UserLogBaseRepository extends Repository<UserLog> {
  constructor(dataSource: DataSource) {
    super(UserLog, dataSource.manager);
  }
}