const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const AppError = require('./utilities/appError');

const http = require('http');

const productRouter = require('./routes/productRoutes');
const viewRouter = require('./routes/viewRoutes');

const errorController = require('./controllers/errorController');

const server = http.createServer();

const port = process.env.PORT;
server.listen(port, () => console.log(`Server started on port ${port}`));



server.on('request', async (req, res) => {

    const { url } = req;


    if (url.startsWith('/api'))
        await productRouter(req, res);
    else
        await viewRouter(req, res);

    if (!req.error && !res.finished)
        req.error = new AppError(404, 'Page not found!');


    errorController(req, res);
});