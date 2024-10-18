import { Repository, DataSource, ILike } from "typeorm";
import { Mesocycle } from "../entities/Mesocycle";
import { UserRepository } from "./UserRepository";
import { AppDataSource } from "../config/ormconfig";
import { validateRequest } from "../middleware/resourceValidator";

export class MesocycleRepository extends Repository<Mesocycle> {
  constructor(dataSource: DataSource) {
    super(Mesocycle, dataSource.manager);
  }

  /**
   * Get all Mesocycles
   * @returns Mesocycle[]
   */
  async getAllMesocycles(): Promise<Mesocycle[]> {
    return await this.find({ relations: ["workouts", "users"] });
  }
  /**
   * Get Mesocycle by ID
   * @param mesocycleId
   * @returns Mesocycle | null
   */
  async getMesocycleById(mesocycleId: string): Promise<Mesocycle | null> {
    return await this.findOneBy({ id: mesocycleId });
  }

  /**
   * get all Mesocycles with users
   * @returns Mesocycle[]
   *
   */
  async getAllMesocycleUsers(): Promise<Mesocycle[]> {
    return await this.find({ relations: ["users"] });
  }

  /**
   * Get Users by Mesocycle ID
   * @param mesocycleId
   * @returns User[] | null
   */
  async getUsersByMesocycleId(mesocycleId: string): Promise<{ id: string; name: string; email: string; created_at: Date }[] | null> {
    const mesocycle = await this.findOne({ where: { id: mesocycleId }, relations: ["users"] });
    return mesocycle?.users.map((user) => ({ id: user.id, name: user.username, email: user.email, created_at: user.created_at })) || null;
  }

  /**
   * Get Mesocycle by Name
   * @param name
   * @returns Mesocycle | null
   */
  async getMesocycleByName(name: string): Promise<Mesocycle | null> {
    return await this.findOneBy({ name: ILike(name) });
  }

  /**
   * Get Mesocycle by UserID
   * @param userId
   * @returns User | null
   */
  async getMesocycleByUserId(userId: string): Promise<Mesocycle[]> {
    return await this.find({ relations: ["users"], where: { users: { id: userId } } });
  }

  /**
   * Get Workouts by Mesocycle
   * @returns Mesocycle[]
   */
  async getAllWorkoutsByMesocycles(): Promise<Mesocycle[]> {
    return await this.find({ relations: ["workouts"] });
  }

  /**
   * Get Workouts by Mesocycle ID
   * @param mesocycleId
   * @returns Workout[] | null
   */
  async getWorkoutsByMesocycleId(mesocycleId: string): Promise<Mesocycle | null> {
    return await this.findOne({ where: { id: mesocycleId }, relations: ["workouts"] });
  }

  /**
   * Update Mesocycle Name
   * @param mesocycleId
   * @param name
   * @returns
   */
  async updateMesocycleName(mesocycleId: string, name: string): Promise<Mesocycle | null> {
    const mesocycle = await this.findOneBy({ id: mesocycleId });

    if (!mesocycle) {
      throw new Error("Mesocycle not found");
    }

    mesocycle.name = name;  
    await validateRequest(mesocycle);
    return await this.save(mesocycle);
  }

  /**
   * create Mesocycle
   * @param name
   * @param length
   * @param created_by
   * @param workouts
   * @param users
   * @returns Mesocycle
   */
  async createMesocycle(userId: string, name: string, length: number): Promise<Mesocycle> {
    const mesocycle = new Mesocycle();
    mesocycle.name = name;
    mesocycle.length = length;

    const user = await new UserRepository(AppDataSource).getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    
    mesocycle.users = [user];
    await validateRequest(mesocycle);
    await this.save(mesocycle);
    return mesocycle;
  }

  /**
   * Delete Mesocycle by ID
   * @param mesocycleId 
   * @returns 
   */
  async deleteMesocycle(mesocycleId: string): Promise<Mesocycle | null> {
    const mesocycle = await this.findOneBy({ id: mesocycleId });

    if (!mesocycle) {
      throw new Error("Mesocycle not found");
    }

    return await this.remove(mesocycle);
  }
}
