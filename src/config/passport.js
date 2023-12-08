export default {
    local: {
        usernameField: 'account',
        passwordField: 'password',
    },
    jwt: {
        secretOrKey: process.env.JWT_SECRET || 'secret',
    },
};
