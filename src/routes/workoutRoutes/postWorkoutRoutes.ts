import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../../config/ormconfig";
import { WorkoutSetters } from "../../repositories/workoutRepository/WorkoutSetters";
import { resourceValidator } from "../../middleware/resourceValidator";

const router = Router();
const workoutRepository = new WorkoutSetters(AppDataSource);
const errorMessage = "Workout not found";

/**
 * Create a new Workout
 * POST /workout/create
 * @param req
 * @param res
 * @param next
 * @returns void
 * @throws Error
 */
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  /**
   * #swagger.tags = ['Workout']
   * #swagger.description = 'Create a new Workout'
   * #swagger.parameters['name'] = { description: 'Workout name' }
   * #swagger.parameters['exerciseIds'] = { description: 'Array of exercise IDs - seperated by &' }
   * #swagger.path = '/workout/create'
   * #swagger.responses[201] = { description: 'Workout created successfully' }
   * #swagger.responses[400] = { description: 'Invalid request' }
   * #swagger.responses[500] = { description: 'Server error' }
   */
  try {
    const name = req.query.name as string;
    // get exerciseIds from query and convert to array
    const exerciseIds = req.query.exerciseIds ? (req.query.exerciseIds as string).split('&') : [];
    const workout = await workoutRepository.createWorkout(name, exerciseIds);
    resourceValidator(workout, errorMessage, req, res);
  } catch (error) {
    next(error);
  }
});

export default router;