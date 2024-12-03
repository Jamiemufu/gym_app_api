import { AppDataSource } from "../../config/ormconfig";
import { User } from "../../entities/User";
import { validateRequest } from "../../middleware/requestValidator";
import { UserBaseRepository } from "./UserBaseRepository";
import { UserGetters } from './UserGetters';

export class UserSetters extends UserBaseRepository {

  userGetters = new UserGetters(AppDataSource);
  /**
   * Create user
   * @param user
   * @returns User
   * @throws Error
   */
  async createUser(username: string, password: string, email: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.password_hash = password;
    user.email = email;
    await validateRequest(user);
    return await this.save(user);
  }

  /**
   * Delete user
   * @param userId
   * @returns void
   * @throws Error
   */
  async deleteUser(userId: string): Promise<User | null> {
    const user = await this.userGetters.getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return await this.remove(user);
  }
}
