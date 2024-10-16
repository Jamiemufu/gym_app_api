// src/routes/UserRoutes.ts
import { Router, Request, Response } from 'express';
import { AppDataSource } from '../config/ormconfig';
import { UserRepository } from '../repositories/UserRepository';

const router = Router();
const userRepository = new UserRepository(AppDataSource);

/**
 * Get user by id
 * GET /users/:id
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get('/:uuid:', async (req: Request, res: Response) => {
    const user = await userRepository.getUserById(req.params.uuid);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/**
 * Get all users
 * GET /users
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
router.get('/', async (req: Request, res: Response) => {
    const users = await userRepository.getAllUsers();
    res.json(users);
});

export default router;
