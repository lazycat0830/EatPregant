import _ from 'lodash';
import DishService from '../Services/DishService';
import checkedValidationUtil from '../../utils/checkedValidation';
import formatResponseUtil from '../../utils/formatResponseUtil';
import { PythonShell } from 'python-shell';

let getDishes = async (req, res) => {
    const response = await DishService.getDishes();

    return formatResponseUtil.formatResponse(res, response);
};
let updateDishes = async (req, res) => {
    const { id } = req.body;
    let image = req.file.buffer;
    const response = await DishService.updateDishes(id, image);
    return formatResponseUtil.formatResponse(res, response);
};

let recommend = async (req, res) => {
    PythonShell.run('src\\http\\python\\process.py')
        .then(async (messages) => {
            console.log('Results:', messages);
            let ops = {
                args: messages,
            };
            if (messages == '發生錯誤，請再試一次')
                res.status(500).send('發生錯誤，請再試一次');
            return PythonShell.run('src\\http\\python\\jiejiebaba.py', ops);
        })
        .then(async (messagesss) => {
            // 處理 jiejiebaba.py 的結果
            // 直接將 JSON 字符串轉為 JavaScript 對象
            const response = await DishService.recommed(JSON.parse(messagesss));

            return formatResponseUtil.formatResponse(res, response);
        })
        .catch((error) => {
            console.error('錯誤訊息:', error);
            res.status(500).send('哎呀!出錯拉!');
        });
};

export default {
    getDishes,
    updateDishes,
    recommend,
};
