// src/repositories/UserRepository.ts

import { Repository, DataSource } from "typeorm";
import { User } from "../entities/User";
import { validate } from "class-validator";
import { error } from "console";

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  /**
   * Get User by ID
   * @param userId
   * @returns User | null
   */
  async getUserById(userId: string): Promise<User | null> {
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
    return await this.findOneBy({ email });
  }

  /**
   * Get User by Username
   * @param username 
   * @returns User | null
   */
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.findOneBy({ username });
  }

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

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    
    return await this.save(user);
  }

  /**
   * Delete user
   * @param userId
   * @returns void
   * @throws Error
   */
  async deleteUser(userId: string): Promise<User | null> {
    const user = await this.findOneBy({ id: userId });

    if (!user) {
      throw new Error("User not found");
    }
    return await this.remove(user);
  }
}
