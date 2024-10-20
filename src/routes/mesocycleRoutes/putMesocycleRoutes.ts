import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { MesocycleSetters } from "../../repositories/mesocycleRepository/MesocycleSetters";

const router = Router();
const mesoRepo = new MesocycleSetters(AppDataSource);
const errorMessage = "Mesocycle not found";

/**
 * Update MesoCycle
 * PUT /mesocycle/update/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 * @throws Error
 */
router.put("/update/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Updates a mesocycle."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.parameters['name'] = { description: "Mesocycle name" }
   * #swagger.parameters['length'] = { description: "Mesocycle length" }
   * #swagger.parameters['phase'] = { description: "Mesocycle phase" }
   * #swagger.parameters['periodization'] = { description: "Mesocycle periodization" }
   * #swagger.path = '/mesocycle/update/{uuid}'
   * #swagger.summary = "Update a mesocycle by ID"
   * #swagger.responses[200] = { description: "Mesocycle updated." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const mesocycle = await mesoRepo.updateMesocycle(
      req.params.uuid,
      req.query.name as string,
      parseInt(req.query.length as string),
      req.query.phase as string,
      req.query.periodization as string
    );
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;