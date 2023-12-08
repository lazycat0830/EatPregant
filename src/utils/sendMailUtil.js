import _ from 'lodash';
class sendMailUtil {
    makeNewPassword = async () => {
        const Code = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
        ];
        let password = '';
        for (var i = 0; i < 10; i++) {
            let pos = Math.round(Math.random() * (Code.length - 1));
            password += Code[pos];
        }
        return password;
    };

    sendMail = async (username, newpassword, tomail) => {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'Fatduck0403@gmail.com',
                pass: 'qcohutshcefhujcv',
            },
        });

        const mailbody = `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8" />
            <title>食來孕轉-忘記密碼</title>
        </head>
        <body>
            <p>${username}，您好</p>
            <p>系統已幫您自動更新密碼:${newpassword}</p>
        </body>
        </html>`;

        transporter
            .sendMail({
                from: '"食來孕轉" <admin55688@gmail.com>',
                to: tomail,
                subject: '食來孕轉-忘記密碼',
                html: mailbody,
            })
            .then((info) => {
                console.log({ info });
            })
            .catch(console.error);
    };
}
export default new sendMailUtil();
