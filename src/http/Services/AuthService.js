import AuthRepository from '../repositories/AuthRepository';
import sendMailUtil from '../../utils/sendMailUtil';
import _, { forEach } from 'lodash';
import configPassport from '../../config/passport';
import jwt from 'jsonwebtoken';
import { string } from 'joi';
import { toBase64 } from 'openai/core';
import { jwtDecode } from 'jwt-decode';

class AuthService {
    Login = async (accountname) => {
        try {
            const result = await AuthRepository.Login(accountname);
            const accountt = _.first(result);
            const { user_id, account, name, phone, email, role, picture } =
                accountt;
            const token = jwt.sign(
                {
                    id: user_id,
                    name,
                },
                configPassport.jwt.secretOrKey,
                { expiresIn: '24h' }
            );

            return {
                status: 200,
                data: {
                    token: token,
                    account: account,
                    name: name,
                    phone: phone,
                    email: email,
                    role: role,
                    picture: Buffer.from(picture).toString('base64'),
                },
            };
        } catch (err) {
            return {
                status: 500,
                message: '輸入資料錯誤',
            };
        }
    };

    Register = async (account, password, name, phone, email, role, picture) => {
        try {
            const result = await AuthRepository.Register(
                account,
                password,
                name,
                phone,
                email,
                role,
                picture
            );
            if (!result) {
                return {
                    status: 404,
                    data: null,
                };
            } else if (typeof result === 'string') {
                return {
                    status: 500,
                    message: result,
                };
            } else if (typeof result === 'object') {
                return {
                    status: 200,
                    data: '註冊成功!開吃!',
                };
            }
        } catch (err) {
            return {
                status: 500,
                message: '系統錯誤',
            };
        }
    };

    ForgetPassword = async (account) => {
        const UserData = await AuthRepository.getUserdataAcc(account);
        if (UserData.length == 0) {
            return {
                status: 400,
                message: '查無該帳號',
            };
        }
        const NewPassword = await sendMailUtil.makeNewPassword();
        await sendMailUtil.sendMail(account, NewPassword, UserData[0].email);
        const result = await AuthRepository.forgetPassword(
            account,
            NewPassword
        );
        if (!result) {
            return {
                status: 200,
                data: '請到信箱獲取最新密碼',
            };
        } else {
            return {
                status: 400,
                message: result,
            };
        }
    };

    getUserdata = async (token) => {
        const decode = jwtDecode(token);
        const result = await AuthRepository.getUserdata(decode.id);
        const accountt = _.first(result);
        const { user_id, account, name, phone, email, role, picture } =
            accountt;

        return {
            status: 200,
            data: {
                user_id: user_id,
                account: account,
                name: name,
                phone: phone,
                email: email,
                role: role,
                picture: Buffer.from(picture).toString('base64'),
            },
        };
    };
}
export default new AuthService();
