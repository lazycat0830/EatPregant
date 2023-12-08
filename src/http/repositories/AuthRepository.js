import _ from 'lodash';
import db from '../../dbcontext';
import strings from '../../utils/strings';
import moment from 'moment';
const { sequelize } = db;
const { QueryTypes } = sequelize;
const TABLE_NAME = 'dbo';

class AuthRepository {
    Login = async (accountt) => {
        try {
            const sql = `
            SELECT
            *
            FROM ${TABLE_NAME}.Users
            WHERE account = '${accountt}'
            `;
            let account = await db.sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });
            return account;
        } catch (err) {
            return err.message;
        }
    };

    Register = async (account, password, name, phone, email, role, picture) => {
        try {
            const sql = `
            INSERT INTO ${TABLE_NAME}.Users
            (
              account,
              password,
              name,
              phone,
              email,
              role,
              picture,
              active,
              create_time
            )
            VALUES
            (
              :account,
              :password,
              :name,
              :phone,
              :email,
              :role,
              :picture,
              't',
              :create_time
            )
          `;

            const result = await db.sequelize.query(sql, {
                replacements: {
                    account: account,
                    password: strings.hash(password),
                    name: name,
                    phone: phone,
                    email: email,
                    role: role,
                    picture: picture,
                    create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                },
            });

            return result;
        } catch (err) {
            return err.message;
        }
    };

    getUserdata = async (id) => {
        try {
            const sql = `
            SELECT
            *
            FROM ${TABLE_NAME}.Users
            WHERE user_id = :id
            `;
            const result = await db.sequelize.query(sql, {
                type: QueryTypes.SELECT,
                replacements: {
                    id: id,
                },
            });

            return result;
        } catch (err) {
            return err.message;
        }
    };
    getUserdataAcc = async (account) => {
        try {
            const sql = `
            SELECT
            *
            FROM ${TABLE_NAME}.Users
            WHERE account = :account
            `;
            const result = await db.sequelize.query(sql, {
                type: QueryTypes.SELECT,
                replacements: {
                    account: account,
                },
            });

            return result;
        } catch (err) {
            return err.message;
        }
    };

    forgetPassword = async (account, newpassword) => {
        try {
            let sql = `
            UPDATE ${TABLE_NAME}.Users SET password = '${strings.hash(
                newpassword
            )}'
            WHERE account = '${account}'
            `;
            await db.sequelize.query(sql);
        } catch (err) {
            return err.message;
        }
    };
}
export default new AuthRepository();
