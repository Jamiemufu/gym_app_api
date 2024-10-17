import { Repository, DataSource } from "typeorm";
import { Mesocycle } from "../entities/Mesocycle";

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
  async getMesocycleUsers(): Promise<Mesocycle[]> {
    return await this.find({ relations: ['users']});
  }
}