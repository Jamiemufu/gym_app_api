import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { resourceValidator } from "../../middleware/resourceValidator";
import { ExerciseSetters } from "../../repositories/exerciseRepository/ExerciseSetters";

const router = Router();
const exerciseRepository = new ExerciseSetters(AppDataSource);
const errorMessage = "Exercise not found";

/**
 * Update exercise by id
 * PUT /exercise/update/:uuid
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 * @throws Error
 */
router.put("/update/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ["Exercise"]
   * #swagger.description = "Updates an exercise by its ID."
   * #swagger.parameters['uuid'] = { description: "Exercise ID" }
   * #swagger.parameters['name'] = { description: "Exercise name" }
   * #swagger.parameters['muscle_group'] = { description: "Muscle group" }
   * #swagger.parameters['equipment'] = { description: "Equipment" }
   * #swagger.path = '/exercise/update/{uuid}'
   * #swagger.summary = "Update an exercise by ID"
   * #swagger.responses[200] = { description: "Exercise updated." }
   * #swagger.responses[404] = { description: "Exercise not found." }
   * #swagger.responses[500] = { description: "Internal server error." }
   */
  try {
    const exercise = await exerciseRepository.updateExercise(
      req.params.uuid,
      req.body.name as string,
      req.body.muscle_group as string,
      req.body.equipment as string
    );
    resourceValidator(exercise, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;