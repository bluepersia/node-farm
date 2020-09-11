module.exports = function (res, statusCode, dataOrMessage = undefined, rest = {}) {
    const status = statusCode >= 200 && statusCode < 300 ? 'success' : statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

    const dataOrMessageField = status === 'success' ? 'data' : 'message';

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status, [dataOrMessageField]: dataOrMessage, ...rest }));
}