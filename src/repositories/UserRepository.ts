// src/repositories/UserRepository.ts

import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/User';

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
}
