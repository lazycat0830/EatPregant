import _ from 'lodash';
import express from 'express';
import Passport from 'passport';

import { jwtAuth } from '../middlewares/jwtAuthMiddleware';
import formatResponseUtil from '../utils/formatResponseUtil';
import DishController from '../http/controllers/Dish';
var multer = require('multer');
var upload = multer({
    storage: multer.memoryStorage(),
    limit: {
        // 限制上傳檔案的大小為 1MB
        fileSize: 10000000,
    },
    fileFilter(req, file, cb) {
        // 只接受三種圖片格式
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'));
        }
        cb(null, true);
    },
});
const router = express.Router();

// token驗證
router.use(jwtAuth('jwt'));

router.get('/getDishes', DishController.getDishes);

router.post(
    '/updatedishes',
    upload.single('image'),
    DishController.updateDishes
);

router.get('/recommend', DishController.recommend);

export default router;
