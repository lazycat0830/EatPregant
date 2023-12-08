import express from 'express';

// import logMiddleware from '../middlewares/logMiddleware';
import AuthRoutes from './Auth';
import OpenAIRoutes from './OpenAI';
import DishRoutes from './Dish';
const router = express.Router();
// router.use(logMiddleware);

router.use('/Auth', AuthRoutes);
router.use('/OpenAI', OpenAIRoutes);
router.use('/Dish', DishRoutes);
export default router;
