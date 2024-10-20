import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { MesocycleSetters } from "../../repositories/mesocycleRepository/MesocycleSetters";

const router = Router();
const mesoRepo = new MesocycleSetters(AppDataSource);
const errorMessage = "Mesocycle not found";

/**
 * Update mesocycle name
 * PATCH /mesocycle/update/:uuid/:name
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.patch("/update/:uuid/name", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Updates a mesocycle name."
   * #swagger.parameters['uuid'] = { description: "Mesocycle ID" }
   * #swagger.parameters['name'] = { description: "New Mesocycle name" }
   * #swagger.path = '/mesocycle/update/{uuid}/name'
   * #swagger.summary = "Update a mesocycle name by ID"
   * #swagger.responses[200] = { description: "Mesocycle updated." }
   * #swagger.responses[404] = { description: "Mesocycle not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const name = req.query.name as string;

    if (!name) {
     throw new Error("Name is required");
    }

    const mesocycle = await mesoRepo.updateMesocycleName(req.params.uuid, name);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
