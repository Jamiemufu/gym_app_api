import e, { Router, Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/ormconfig";
import { ExerciseRepository } from "../repositories/ExerciseRepository";
import { resourceValidator } from "../middleware/resourceValidator";

const router = Router();
const exerciseRepository = new ExerciseRepository(AppDataSource);

/**
 * Get all exercises
 * GET /exercises
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exercises = await exerciseRepository.getAllExercises();
    resourceValidator(exercises);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(404).json({ message: "Exercises not found" });
  }
});

/**
 * Get exercise by name
 * GET /exercises/name/:name
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.get("/name/:name", async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseRepository.getExerciseByName(req.params.name);
    resourceValidator(exercise);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(404).json({ message: "Exercise not found" });
  }
});

/**
 * Get exercise by muscle group
 * GET /exercises/muscle_group/:muscle_group
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/muscle_group/:muscle_group", async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseRepository.getExerciseByType(req.params.muscle_group);
    resourceValidator(exercise);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(404).json({ message: "Exercise not found" });
  }
});

/**
 * Get exercise by equipment
 * GET /exercises/equipment/:equipment
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise[]>
 */
router.get("/equipment/:equipment", async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseRepository.getExerciseByEquipment(req.params.equipment);
    resourceValidator(exercise);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(404).json({ message: "Exercise not found" });
  }
});

/**
 * Get exercise by id
 * GET /exercises/:id
 * @param req Request
 * @param res Response
 * @returns Promise<Exercise>
 */
router.get("/:uuid", async (req: Request, res: Response) => {
  try {
    const exercise = await exerciseRepository.getExerciseById(req.params.uuid);
    resourceValidator(exercise);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(404).json({ message: "Exercise not found" });
  }
});

export default router;
