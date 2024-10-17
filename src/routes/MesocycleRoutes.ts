// src/routes/UserRoutes.ts
import { Router, Request, Response } from 'express';
import { AppDataSource } from '../config/ormconfig';
import { MesocycleRepository } from '../repositories/MesocycleRepository';

const router = Router();
const userRepository = new MesocycleRepository(AppDataSource);

/**
 * Get all mesocycles
 * GET /mesocycles
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get('/', async (req: Request, res: Response) => {
    const mesocycles = await userRepository.getAllMesocycles();
    res.json(mesocycles);
});

/**
 * Get mesocycle by id
 * GET /mesocycles/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get('/:uuid:', async (req: Request, res: Response) => {
    const mesocycle = await userRepository.getMesocycleById(req.params.uuid);
    if (mesocycle) {
        res.json(mesocycle);
    } else {
        res.status(404).json({ message: 'Mesocycle not found' });
    }
  });

/**
 * Get all users
 * GET /users
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get('/users', async (req: Request, res: Response) => {
    const users = await userRepository.getMesocycleUsers();
    res.json(users);
});

export default router;
