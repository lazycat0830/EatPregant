import LogController from '../http/controllers/log';

function getCallerIP(request) {
    const origin =
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    let ip = origin.split(',')[0];
    ip = ip.split(':').slice(-1); // in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip[0];
}

export default async function logMiddleware(req, res, next) {
    const ip = getCallerIP(req);
    await LogController.addLog(ip);
    next();
}
