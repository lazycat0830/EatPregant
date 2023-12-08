import _ from 'lodash';
import AuthService from '../Services/AuthService';
import checkedValidationUtil from '../../utils/checkedValidation';
import formatResponseUtil from '../../utils/formatResponseUtil';

async function Login(req, res) {
    const queryKey = ['account'];
    if (!checkedValidationUtil.keyChecked(queryKey, req.body))
        return formatResponseUtil.keyErrorResponse(res, '欄位格式有誤，請檢查');
    const { account } = req.body;
    const response = await AuthService.Login(account);

    return formatResponseUtil.formatResponse(res, response);
}

async function Register(req, res) {
    const bodyKey = ['account', 'password', 'name', 'phone', 'email', 'role'];
    if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
        return formatResponseUtil.keyErrorResponse(res, '欄位格式有誤，請檢查');

    const { account, password, name, phone, email, role } = req.body;

    let picture = req.file.buffer;
    const response = await AuthService.Register(
        account,
        password,
        name,
        phone,
        email,
        role,
        picture
    );

    return formatResponseUtil.formatResponse(res, response);
}

async function ForgetPassword(req, res) {
    const bodyKey = ['account'];
    if (!checkedValidationUtil.keyChecked(bodyKey, req.body))
        return formatResponseUtil.keyErrorResponse(res, '欄位格式有誤，請檢查');
    const { account } = req.body;
    const response = await AuthService.ForgetPassword(account);

    return formatResponseUtil.formatResponse(res, response);
}

let getUserdata = async (req, res) => {
    const token = req.headers['authorization'];
    const response = await AuthService.getUserdata(token);

    return formatResponseUtil.formatResponse(res, response);
};

export default {
    Login,
    Register,
    ForgetPassword,
    getUserdata,
};
