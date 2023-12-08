import moment from 'moment';
import puppeteer from 'puppeteer';
import stream from 'stream';
import _ from 'lodash';
import OpenAIService from '../Services/OpenAIService';
import formatResponseUtil from '../../utils/formatResponseUtil';
import checkedValidationUtil from '../../utils/checkedValidation';

let Call_ChatGPT = async (req, res) => {
    const bodykey = ['prompt'];
    if (!checkedValidationUtil.keyChecked(bodykey, req.body))
        return formatResponseUtil.keyErrorResponse(res, '欄位格式有誤，請檢查');

    const { prompt } = req.body;
    const response = await OpenAIService.Call_ChatGPT(prompt);

    return formatResponseUtil.formatResponse(res, response);
};

export default {
    Call_ChatGPT,
};
