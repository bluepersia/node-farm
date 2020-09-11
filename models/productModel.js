const fs = require('../utilities/fs');

const dataPath = './dev-data/data.json';


async function write(data) {
    await fs.writeFile(dataPath, JSON.stringify(data));
}

async function read() {
    const txt = await fs.readFile(dataPath);

    const products = JSON.parse(txt);

    return products;
}


module.exports.getAll = async function () {
    return await read();
}


module.exports.getBySlug = async function (slug) {
    const products = await read();

    return products.find(product => product.slug === slug);
}