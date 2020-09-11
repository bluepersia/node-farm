const viewController = require('../controllers/viewController');

module.exports = async function (req, res) {
    const { url } = req;

    if (url.startsWith('/product'))
        await viewController.getProduct(req, res);
    else
        if (url.startsWith('/')) {
            await viewController.getOverview(req, res);
        }

}