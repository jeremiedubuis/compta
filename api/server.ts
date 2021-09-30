import path from 'path';
require('dotenv').config();
import polka from 'polka';
import fs from 'fs';
import { json } from 'body-parser';
import { cookieMiddleware } from './helpers/cookieMiddleware';
import { sessionMiddleware } from './helpers/sessionMiddleware';
import cors from 'cors';

const app = polka();
console.log(process.env.CORS.split(','));
app.use(
    cors({
        origin: process.env.CORS.split(','),
        credentials: true
    }),
    cookieMiddleware,
    sessionMiddleware,
    json()
);

fs.readdir(path.join(__dirname, '/routes'), (err, files) => {
    files.forEach((file) => {
        console.log(file);
        if (file.startsWith('ApiRoute') || (!file.endsWith('.js') && !file.endsWith('.ts'))) return;
        const { createRoutes } = require(path.join(__dirname, `./routes/${file}`));
        createRoutes(app);
    });

    app.listen(process.env.API_PORT || 3000);
});

export default app;
