import express from 'express';
import fs from 'fs';

import apiRouter from './api';
import config from './config';

const server = express();



//Effective Javascript (EJS) 
server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render('index', {
        content: '...'

    });
});

//Express middleware to access folders
server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config.port, () => {
    console.info('Express listening on port ', config.port);
});

