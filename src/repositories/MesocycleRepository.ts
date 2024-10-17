import { Repository, DataSource } from "typeorm";
import { Mesocycle } from "../entities/Mesocycle";
import { Workout } from "../entities/Workout";

export class MesocycleRepository extends Repository<Mesocycle> {
  constructor(dataSource: DataSource) {
    super(Mesocycle, dataSource.manager);
  }

  /**
   * Get all Mesocycles
   * @returns Mesocycle[]
   */
  async getAllMesocycles(): Promise<Mesocycle[]> {
    return await this.find();
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
   * Get Mesocycle by UserID
   * @param userId
   * @returns User | null
   */
  async getMesocycleByUser(userId: string): Promise<Mesocycle[]> {
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
}
