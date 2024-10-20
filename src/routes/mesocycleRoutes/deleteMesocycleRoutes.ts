import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { MesocycleSetters } from "../../repositories/mesocycleRepository/MesocycleSetters";

const router = Router();
const mesoRepo = new MesocycleSetters(AppDataSource);
const errorMessage = "Mesocycle not found";

/**
 * Delete mesocycle
 * DELETE /mesocycle/delete/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.delete("/delete/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Deletes a mesocycle."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.path = '/mesocycle/delete/{uuid}'
   * #swagger.summary = "Delete a mesocycle by ID"
   * #swagger.responses[204] = { description: "Mesocycle deleted." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.deleteMesocycle(req.params.uuid);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;