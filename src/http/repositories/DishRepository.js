import _ from 'lodash';
import db from '../../dbcontext';
import strings from '../../utils/strings';
import moment from 'moment';
const { sequelize } = db;
const { QueryTypes } = sequelize;
const TABLE_NAME = 'dbo';

class AuthRepository {
    getDishes = async () => {
        try {
            const sql = `SELECT * FROM Dishes `;
            let result = await db.sequelize.query(sql, {
                type: QueryTypes.SELECT,
            });
            return result;
        } catch (err) {
            return err.message;
        }
    };
    updateDishes = async (id, image) => {
        try {
            const sql = `UPDATE Dishes SET image = :image WHERE id = :id`;
            const result = await db.sequelize.query(sql, {
                replacements: {
                    image: image,
                    id: id,
                },
            });
            return result;
        } catch (err) {
            return err.message;
        }
    };
}
export default new AuthRepository();
