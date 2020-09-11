const jSend = require('./jSend');
const { render } = require('./viewController');

module.exports = function (req, res) {

    const { error, url } = req;

    if (error) {
        const statusCode = error.statusCode || 500;
        const { message } = error;

        if (url.startsWith('/api'))
            jSend(res, statusCode, message);
        else
            render(res, statusCode, 'error', { message });
    }
}