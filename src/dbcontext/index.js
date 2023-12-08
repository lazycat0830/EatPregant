import Sequelize from 'sequelize';
import _ from 'lodash';

import config from '../config/db';

const sequelize = new Sequelize(
    config.SB.DB_NAME,
    config.SB.DB_USER,
    config.SB.DB_PASS, {
        dialect: config.SB.DB_TYPE,
        host: config.SB.DB_HOST,
    }
);

sequelize.sync();

export default _.extend({
    sequelize,
    Sequelize,
}, {});