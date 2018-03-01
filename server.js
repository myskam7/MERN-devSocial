import express from 'express';
import fs from 'fs';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import apiRouter from './api';
import config from './config';

const server = express();


//SASS
server.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public')
}));


//Effective Javascript (EJS) 
server.set('view engine', 'ejs');


import './serverRender'; //this is to trigger serverRender

server.get('/', (req, res) => {
    res.render('index', {
        content: '...'

    });
});

//Express middleware to access folders
server.use('/api', apiRouter);
server.use(express.static('public'));


server.listen(config.port, config.host, () => {
    console.info('Express listening on port ', config.port);
});

