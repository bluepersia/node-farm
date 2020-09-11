const jSend = require('./jSend');
const { render } = require('./viewController');

module.exports = function (req, res) {

    const { error, url } = req;

    if (error) {
        let statusCode = error.statusCode || 500;
        let { message } = error;

        let rest = {};

        if (process.env.NODE_ENV == 'production') {

            if (!error.isOperational) {
                statusCode = 500;
                message = 'Something went wrong!';
            }
        }
        else {
            rest.error = error;
            rest.stack = err.stack;
        }

        if (url.startsWith('/api'))
            jSend(res, statusCode, message, rest);
        else
            render(res, statusCode, 'error', { message });
    }
}