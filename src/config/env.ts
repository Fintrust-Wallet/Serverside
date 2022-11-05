const joi = require("joi");
const logger = require("../utils.ts/logger");

require("dotenv").config();

const schema = joi
    .object({
        NODE_ENV: joi
            .string()
            .valid("development", "production", "test", "provision")
            .default("development"),
        TOKEN_EXPIRES: joi.number(),
        PORT: joi.number().required(),
    })
    .unknown()
    .required();

const { error, value: env } = schema.validate(process.env);

if (error) {
    logger.error(`Config validation error: ${error.message}`);
}

const secrets = {
    PORT: env.PORT,
    env: env.NODE_ENV,
};

export {secrets}
// module.exports = secrets;
