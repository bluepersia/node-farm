const fs = require('../utilities/fs');

async function getTemplate(name) {
    return await fs.readFile(`./templates/${name}.html`, { encoding: 'utf8' });
}

function replaceTemplate(html, data) {
    console.log(data);
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