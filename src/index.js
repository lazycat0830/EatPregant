#!/usr/bin/env node

/**
 * Module dependencies.
 */
import 'dotenv/config';
import debug from 'debug';
import http from 'http';

import App from './App';

async function main() {
    const dd = debug('monolithic:server');

    // Create App & Boot
    const app = new App();
    await app.boot();

    const expressApp = app.getExpressApp();

    /**
     * Normalize a port into a number, string, or false.
     */
    function normalizePort(val) {
        const res = parseInt(val, 10);
        if (Number.isNaN(res)) {
            // named pipe
            return val;
        }
        if (res >= 0) {
            // port number
            return res;
        }
        return false;
    }

    /**
     * Get port from environment and store in Express.
     */
    const port = normalizePort(process.env.NODE_PORT || '3000');
    expressApp.set('port', port);

    /**
     * Create HTTP server.
     */
    const server = http.createServer(expressApp);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, process.env.NODE_HOST);

    /**
     * Event listener for HTTP server "error" event.
     */
    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`); // eslint-disable-line no-console
                process.exit(1);
                break;
            default:
                throw error;
        }
    });

    /**
     * Event listener for HTTP server "listening" event.
     */
    server.on('listening', () => {
        const addr = server.address();
        const bind =
            typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
        dd(`Listening on ${bind}`);
        console.log(
            '食來孕轉 啟動! PORT:%s , HOST:%s',
            server.address().port,
            server.address().address
        );
    });
}

main();
