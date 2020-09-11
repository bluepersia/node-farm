const viewController = require('../controllers/viewController');

module.exports = async function (req, res) {
    const { url } = req;

    if (url.startsWith('/')) {
        await viewController.getOverview(req, res);
    }

}