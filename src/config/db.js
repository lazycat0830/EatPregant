import Joi from 'joi';

require('dotenv').config();

const envVarsSchema = Joi.object({
        DB_TYPE: Joi.string(),
        DB_HOST: Joi.string(),
        DB_NAME: Joi.string(),
        DB_USER: Joi.string(),
        DB_PASS: Joi.string(),
    })
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`環境檔錯誤: ${error.message}`);
}

const config = {
    SB: {
        DB_TYPE: envVars.DB_TYPE,
        DB_HOST: envVars.DB_HOST,
        DB_NAME: envVars.DB_NAME,
        DB_USER: envVars.DB_USER,
        DB_PASS: envVars.DB_PASS,
    }
};

export default config;