const fs = require('fs');
const slugify = require('slugify');

const products = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

for (const product of products)
    product.slug = slugify(product.productName, { lower: true });


fs.writeFileSync(`${__dirname}//data.json`, JSON.stringify(products));
