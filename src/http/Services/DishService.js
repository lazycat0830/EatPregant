import DishRepository from '../repositories/DishRepository';
import sendMailUtil from '../../utils/sendMailUtil';
import _, { forEach, words } from 'lodash';
import configPassport from '../../config/passport';
import jwt from 'jsonwebtoken';
import { array, string } from 'joi';
import { toBase64 } from 'openai/core';
import DishHelper from '../../utils/helphelp';

class DishService {
    getDishes = async () => {
        const result = await DishRepository.getDishes();
        const data = await DishHelper.formatDish(result);

        if (!result) {
            return {
                status: 404,
                data: null,
            };
        } else if (typeof result === 'string') {
            return {
                status: 500,
                message: data,
            };
        } else if (typeof result == 'object') {
            return {
                status: 200,
                data: data,
            };
        }
    };

    updateDishes = async (id, image) => {
        const result = await DishRepository.updateDishes(id, image);
        if (!result) {
            return {
                status: 404,
                data: null,
            };
        } else if (typeof result === 'string') {
            return {
                status: 500,
                message: result,
            };
        } else if (typeof result == 'object') {
            return {
                status: 200,
                data: result,
            };
        }
    };

    recommed = async (messagesss) => {
        try {
            // 提取出列表中的字詞
            let words = messagesss.map((item) => item.trim());
            let dishes = await DishRepository.getDishes();
            let gooDish = [];
            _.forEach(words, (word) => {
                _.forEach(dishes, (dish) => {
                    if (dish.therapy === null || dish.therapy === '') return;
                    dish.therapy.includes(word) ? gooDish.push(dish) : false;
                });
            });

            const data = await DishHelper.formatDish(_.uniq(gooDish));

            return {
                status: 200,
                data: data,
            };
        } catch (err) {
            return {
                status: 400,
                message: err.message,
            };
        }
    };
}
export default new DishService();
