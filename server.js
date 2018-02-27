import express from 'express';
import fs from 'fs';

import apiRouter from 'express';
import config from './config';

const server = express();

server.get('/', (req, res) => {
    res.send('Hello Express');
});

//Express middleware to access folders
server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config.port, () => {
    console.info('Express listening on port ', config.port);
});

