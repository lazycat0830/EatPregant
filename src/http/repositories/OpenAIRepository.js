import _ from 'lodash';
import db from '../../dbcontext';
import moment from 'moment';
const { sequelize } = db;
const { QueryTypes } = sequelize;
const APP_ENV = process.env.APP_ENV;
const TABLE_NAME = 'dbo';