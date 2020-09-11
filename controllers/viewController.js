const fs = require('../utilities/fs');
const productModel = require('../models/productModel');
const catchASync = require('./catchASync');
const url = require('url');
const AppError = require('../utilities/AppError');

async function getTemplate(name) {
    return await fs.readFile(`./templates/${name}.html`, 'utf-8');
}

function replaceTemplate(html, data) {
    for (const [key, value] of Object.entries(data)) {
        const regExp = new RegExp(`{%${key}%}`, 'gi');

        html = html.replace(regExp, value);
    }

    html = html.replace('{%NOT_ORGANIC%}', data.organic ? '' : 'not-organic');

    return html;
}


async function render(res, statusCode, template, data = {}) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });

    let html = await getTemplate(template);

    html = replaceTemplate(html, data);

    res.end(html);
}



module.exports.render = render;




module.exports.getOverview = catchASync(async function (req, res) {
    const products = await productModel.getAll();

    const cardHTML = await getTemplate('card');

    const productCards = products.map(product => replaceTemplate(cardHTML, product));

    await render(res, 200, 'overview', { productCards });

});


module.exports.getProduct = catchASync(async function (req, res) {

    const { query: { slug } } = url.parse(req.url, true);

    const product = await productModel.getBySlug(slug);

    if (!product) {
        req.error = new AppError(404, 'Product not found!');
        return;
    }

    await render(res, 200, 'product', product);
});