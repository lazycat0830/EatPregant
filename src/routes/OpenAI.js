import express from 'express';

import { jwtAuth } from '../middlewares/jwtAuthMiddleware';

import OpenAIController from '../http/controllers/OpenAI';

const router = express.Router();

router.get('/ChatGPT', OpenAIController.Call_ChatGPT);

export default router;
