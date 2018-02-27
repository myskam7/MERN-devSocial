import express from 'express';
import fs from 'fs';

import apiRouter from './api';
import config from './config';

const server = express();

server.get('/', (req, res) => {
    res.render('index', {
        content: '<p>This is <em>EJS</em> running!</p>'
    });
});

//Effective Javascript (EJS) 
server.set('view engine', 'ejs')

//Express middleware to access folders
server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config.port, () => {
    console.info('Express listening on port ', config.port);
});

