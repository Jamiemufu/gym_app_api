import { AppDataSource } from "../../config/ormconfig";
import { Mesocycle } from "../../entities/Mesocycle";
import { validateRequest } from "../../middleware/requestValidator";
import { UserGetters } from "../userRepository/UserGetters";
import { MesocycleBaseRepository } from "./MesocycleBaseRepository";

export class MesocycleSetters extends MesocycleBaseRepository {
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
   * Update Mesocycle
   * @param mesocycleId
   * @param name
   * @param length
   * @param phase
   * @param periodization
   * @returns Mesocycle
   * @throws Error
   */
  async updateMesocycle(mesocycleId: string, name: string, length: number, phase: string, periodization: string): Promise<Mesocycle> {
    const mesocycle = await this.findOneBy({ id: mesocycleId });

    if (!mesocycle) {
      throw new Error("Mesocycle not found");
    }

    mesocycle.name = name;
    mesocycle.length = length;
    mesocycle.phase = phase;
    mesocycle.periodization = periodization === "true" ? true : false;

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
  async createMesocycle(userId: string, name: string, length: number, phase: string, periodization: string): Promise<Mesocycle> {
    const mesocycle = new Mesocycle();
    mesocycle.name = name;
    mesocycle.length = length;
    mesocycle.phase = phase;
    mesocycle.periodization = periodization.toLowerCase() === "true" ? true : false;

    const user = await new UserGetters(AppDataSource).getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    mesocycle.users = [user];
    await validateRequest(mesocycle);
    await this.save(mesocycle);
    return mesocycle;
  }

  /**
   * Add User to Mesocycle
   * @param mesocycleId
   * @param userId
   * @returns
   * @throws Error
   * @returns Mesocycle
   * @throws Error
   * @returns Mesocycle
   */
  async addUserToMesocycle(mesocycleId: string, userId: string): Promise<Mesocycle> {
    const mesocycle = await this.findOne({ where: { id: mesocycleId }, relations: ["users"] });

    if (!mesocycle) {
      throw new Error("Mesocycle not found");
    }

    const user = await new UserGetters(AppDataSource).getUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    mesocycle.users.push(user);
    await validateRequest(mesocycle);
    return await this.save(mesocycle);
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
