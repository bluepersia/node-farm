const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const http = require('http');

const server = http.createServer();

const port = process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));



server.on('request', (req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>You requested ${req.url}</h1>`);
});