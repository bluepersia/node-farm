const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const http = require('http');

const server = http.createServer();

const port = process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));