import _ from 'lodash';
import express from 'express';
import Passport from 'passport';

import { jwtAuth } from '../middlewares/jwtAuthMiddleware';
import formatResponseUtil from '../utils/formatResponseUtil';
import AuthController from '../http/controllers/Auth';
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

router.post(
    '/login',
    (req, res, next) => {
        Passport.authenticate(
            'local',
            { session: false },
            (err, account, info) => {
                if (err) {
                    res.send(err);
                    return;
                }
                if (!account) {
                    let response = '';
                    const statusCode = _.get(info, 'status', 500);
                    if (statusCode === 401) {
                        response = {
                            status: statusCode,
                            message: '帳號或密碼錯誤',
                        };
                        return formatResponseUtil.formatResponse(res, response);
                    } else if (statusCode === 404) {
                        response = {
                            status: statusCode,
                            message: '查無此用戶',
                        };
                        return formatResponseUtil.formatResponse(res, response);
                    }
                    response = {
                        status: statusCode,
                        message: '系統錯誤',
                    };
                    return formatResponseUtil.formatResponse(res, response);
                }
                next();
            }
        )(req, res);
    },
    AuthController.Login
);

router.post('/register', upload.single('picture'), AuthController.Register);

router.get('/forgetpassword', AuthController.ForgetPassword);

// token驗證
router.use(jwtAuth('jwt'));

router.get('/user', AuthController.getUserdata);
export default router;
