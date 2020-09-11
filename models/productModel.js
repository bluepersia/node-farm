const fs = require('../utilities/fs');

const dataPath = './dev-data/data.json';


async function write(data) {
    await fs.writeFile(dataPath, JSON.stringify(data));
}

async function read() {
    const txt = await fs.readFile(dataPath);

    return JSON.parse(txt);
}


module.exports.getAll = async function () {
    return await read();
}