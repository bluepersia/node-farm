const controller = require('../controllers/productController');

module.exports = async function (req, res) {

    await controller.getAllProducts(req, res);

}