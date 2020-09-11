module.exports = function (func) {
    return async function (req, res) {

        try {
            await func(req, res);
        }
        catch (err) {
            req.error = err;
        }
    }
}