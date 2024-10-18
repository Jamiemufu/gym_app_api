import { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { ExerciseRepository } from "../repositories/ExerciseRepository";
import { resourceValidator } from "../middleware/resourceValidator";

const router = Router();
const exerciseRepository = new ExerciseRepository(AppDataSource);
const errorMessage = "Exercise not found";

/**
 * Get all exercises
 * GET /exercises
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercises = await exerciseRepository.getAllExercises();
    resourceValidator(exercises, errorMessage);
    res.status(200).json(exercises);
  } catch (err) {
    next(err);
  }
});

/**
 * Get exercise by name
 * GET /exercises/name/:name
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.get("/name/:name", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseRepository.getExerciseByName(req.params.name);
    resourceValidator(exercise, errorMessage);
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
});

/**
 * Get exercise by muscle group
 * GET /exercises/muscle_group/:muscle_group
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/muscle_group/:muscle_group", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseRepository.getExerciseByType(req.params.muscle_group);
    resourceValidator(exercise, errorMessage);
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
});

/**
 * Get exercise by equipment
 * GET /exercises/equipment/:equipment
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/equipment/:equipment", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseRepository.getExerciseByEquipment(req.params.equipment);
    resourceValidator(exercise, errorMessage);
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
});

/**
 * Get exercise by id
 * GET /exercises/:id
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.get("/:uuid", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercise = await exerciseRepository.getExerciseById(req.params.uuid);
    resourceValidator(exercise, errorMessage);
    res.status(200).json(exercise);
  } catch (error) {
    next(error);
  }
});

export default router;
