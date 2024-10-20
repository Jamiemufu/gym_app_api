import { Repository, DataSource } from "typeorm";
import { User } from "../../entities/User";

export class UserBaseRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }
}

