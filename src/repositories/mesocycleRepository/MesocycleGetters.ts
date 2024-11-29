import { MesocycleBaseRepository } from "./MesocycleBaseRepository";
import { Mesocycle } from "../../entities/Mesocycle";
import { ILike } from "typeorm";

export class MesocycleGetters extends MesocycleBaseRepository {

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
   * Get MesoCycle by ID with relations
   * @param mesocycleId 
   * @returns MesoCycle | null
   */
  async getMesocycleByIdWithRelations(mesocycleId: string): Promise<Mesocycle | null> {
    return await this.findOne({ where: { id: mesocycleId }, relations: ["workouts", "users"] });
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
}