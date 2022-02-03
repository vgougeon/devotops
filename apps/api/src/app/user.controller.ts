import { Router } from 'express';
import User from '../db/models/user.model';
const router = Router()

router.get('/users', async (req, res) => {
    res.send(await User.query())
})

export default router