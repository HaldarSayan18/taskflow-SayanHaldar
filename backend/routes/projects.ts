import { Request, Response, Router } from 'express';
import { pool } from '../db';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
})

export default router;