import bcrypt from 'bcrypt';
import _ from 'lodash';

function random(len, _mapStr) {
    const mapStr =
        _mapStr ||
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const res = _.sampleSize(mapStr, len);
    return res.join('');
}

function hash(str) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(str, saltRounds);
    return hash;
}

function verifyHash(org, hashedStr) {
    const saltRounds = 10;
    return bcrypt.compareSync(org, hashedStr);
}

export default {
    random,
    hash,
    verifyHash,
};
