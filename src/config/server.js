import Joi from 'joi';

require('dotenv').config();

const envVarsSchema = Joi.object({
    NODE_HOST: Joi.string(),
    NODE_PORT: Joi.number(),
    JWT_SECRET: Joi.string(),
})
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`環境檔錯誤: ${error.message}`);
}

const config = {
    NODE_HOST: envVars.NODE_HOST,
    NODE_PORT: envVars.NODE_PORT,
    JWT_SECRET: envVars.JWT_SECRET,
};

export default config;
