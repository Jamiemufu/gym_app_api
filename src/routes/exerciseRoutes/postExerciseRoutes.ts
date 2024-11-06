import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { ExerciseSetters } from "../../repositories/exerciseRepository/ExerciseSetters";

const router = Router();
const exerciseRepository = new ExerciseSetters(AppDataSource);
const errorMessage = "Exercise not found";

/**
 * Create a new exercise
 * POST /exercise/create
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Creates a new exercise."
   * #swagger.parameters['name'] = { description: "Exercise name", required: true }
   * #swagger.parameters['muscle_group'] = { description: "Muscle group", required: true }
   * #swagger.parameters['equipment'] = { description: "Equipment", required: true }
   * #swagger.summary = "Create a new exercise"
   * #swagger.path = '/exercise/create'
   * #swagger.responses[201] = { description: "Exercise created." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.createExercise(req.body.name as string, req.body.muscle_group as string, req.body.equipment as string);
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
