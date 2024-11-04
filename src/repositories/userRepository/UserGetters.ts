import { ILike } from "typeorm";
import { UserBaseRepository } from "./UserBaseRepository";
import { User } from "../../entities/User";

export class UserGetters extends UserBaseRepository {
  /**
   * Get User by ID
   * @param userId
   * @returns User | null
   */
  async getUserById(userId: string): Promise<User | null> {

    // We should throw an error if the user ID is not provided because its not returning null if null is not passed
    if(!userId) {
      throw new Error("User ID is required");
    }

    return await this.findOneBy({ id: userId });
  }

  /**
   * Get all Users
   * @returns User[]
   */
  async getAllUsers(): Promise<User[]> {
    return await this.find();
  }
  
  /**
   * Get User by Email
   * @param email 
   * @returns User | null
   */
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.findOne({
      where: { email: ILike(email) },
    });
  }

  /**
   * Get User by Username
   * @param username 
   * @returns User | null
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.findOneBy({ username: ILike(username) });
  }

}