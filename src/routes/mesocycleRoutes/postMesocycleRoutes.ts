import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { MesocycleSetters } from "../../repositories/mesocycleRepository/MesocycleSetters";

const router = Router();
const mesoRepo = new MesocycleSetters(AppDataSource);
const errorMessage = "Mesocycle not found";

/**
 * Create mesocycle
 * POST /mesocycle/create/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.post("/create/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Mesocycle"]
   * #swagger.description = "Creates a new mesocycle."
   * #swagger.parameters['uuid'] = { description: "User ID" }
   * #swagger.parameters['name'] = { description: "Mesocycle name" }
   * #swagger.parameters['length'] = { description: "Mesocycle length" }
   * #swagger.parameters['phase'] = { description: "Mesocycle phase" }
   * #swagger.parameters['periodization'] = { description: "Mesocycle periodization" }
   * #swagger.path = '/mesocycle/create/{uuid}'
   * #swagger.summary = "Create a new mesocycle"
   * #swagger.responses[201] = { description: "Mesocycle created." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const userId = req.params.uuid;
    const name = req.query.name as string;
    const length = parseInt(req.query.length as string);
    const phase = req.query.phase as string;
    const periodization = req.query.periodization as string;
    const mesocycle = await mesoRepo.createMesocycle(userId, name, length, phase, periodization);
    resourceValidator(mesocycle, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;