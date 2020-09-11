const fs = require('../utilities/fs');
const productModel = require('../models/productModel');
const catchASync = require('./catchASync');

async function getTemplate(name) {
    return await fs.readFile(`./templates/${name}.html`, 'utf-8');
}

function replaceTemplate(html, data) {
    for (const [key, value] of Object.entries(data)) {
        const regExp = new RegExp(`{%${key}%}`, 'gi');

        html = html.replace(regExp, value);
    }

    return html;
}


async function render(res, statusCode, template, data = {}) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });

    let html = await getTemplate(template);

    html = replaceTemplate(html, data);

    res.end(html);
}



module.exports.render = render;




function renderProduct(html, product) {

    html = replaceTemplate(html, product);

    html = html.replace('{%NOT_ORGANIC%}', product.organic ? '' : 'not-organic');

    return html;
}

module.exports.getOverview = catchASync(async function (req, res) {
    const products = await productModel.getAll();

    const cardHTML = await getTemplate('card');

    const productCards = products.map(product => renderProduct(cardHTML, product));

    render(res, 200, 'overview', { productCards });

});