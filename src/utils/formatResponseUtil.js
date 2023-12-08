import _ from 'lodash';

class formatResponseUtil {
    formatResponse = (res, data) => {
        try {
            if (data.status === 200) {
                return res.status(200).json({
                    status: data.status,
                    message: 'susses',
                    success: true,
                    data: data.data,
                });
            } else if (
                data.status === 401 ||
                data.status === 500 ||
                data.status === 400
            ) {
                return res.status(data.status).json({
                    status: data.status,
                    message: data.message,
                    success: false,
                    data: null,
                });
            } else if (data.status === 404) {
                return res.status(404).json({
                    status: data.status,
                    message: data.message ? data.message : 'Not found',
                    success: false,
                    data: null,
                });
            }
        } catch (err) {
            return {
                status: 400,
                message: err.message,
                success: 'false',
            };
        }
    };

    keyErrorResponse = (res, message) => {
        return res.status(400).json({
            status: 400,
            message: message,
        });
    };
}
export default new formatResponseUtil();
