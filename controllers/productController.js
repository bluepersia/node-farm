const model = require('../models/productModel');
const jSend = require('./jSend');
const catchASync = require('./catchASync');

module.exports.getAllProducts = catchASync(async function (req, res) {

    const products = await model.getAll();

    jSend(res, 200, { products });
});