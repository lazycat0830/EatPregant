import _ from 'lodash';
import Passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import config from '../config/passport';

import db from '../dbcontext';

import strings from '../utils/strings';

const { sequelize } = db;
const { QueryTypes } = sequelize;
const APP_ENV = process.env.APP_ENV;
const TABLE_NAME = 'dbo';

class PassportProvider {
    constructor(expressApp) {
        this.app = expressApp;
    }

    addLocalStrategy = () => {
        const options = config.local;
        Passport.use(
            new LocalStrategy(options, async (username, password, done) => {
                const sql = `
                SELECT 
                *
                FROM ${TABLE_NAME}.Users
                WHERE account = '${username}'
                `;
                let account = await db.sequelize.query(sql, {
                    type: QueryTypes.SELECT,
                });
                account = _.first(account);
                if (_.isNull(account) || _.isUndefined(account))
                    return done(null, false, { status: 404 });
                if (strings.verifyHash(password, account.password))
                    return done(null, account);
                return done(null, false, { status: 401 });
            })
        );
    };

    addJwtStrategy = () => {
        // Add JwtStrategy
        const options = {
            jwtFromRequest: (req) =>
                ExtractJwt.fromAuthHeaderAsBearerToken()(req) ||
                ExtractJwt.fromUrlQueryParameter('jwt')(req),
            authScheme: 'Bearer',
            ...config.jwt,
        };
        Passport.use(
            new JwtStrategy(options, async (jwtPayload, done) => {
                const sql = `
                SELECT 
                *
                FROM ${TABLE_NAME}.Users
                WHERE user_id = '${jwtPayload.id}'
                `;
                let account = await db.sequelize.query(sql, {
                    type: QueryTypes.SELECT,
                });
                account = _.first(account);
                return done(
                    null,
                    _.isNull(account) || _.isUndefined(account)
                        ? false
                        : account
                );
            })
        );
    };

    boot() {
        this.addLocalStrategy();
        this.addJwtStrategy();
        this.app.use(Passport.initialize());
    }
}

export default PassportProvider;
