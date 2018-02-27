import express from 'express';
import fs from 'fs';

import config from './config';

const server = express();

server.get('/', (req, res) => {
    res.send('Hello Express');
});

//Static middleware to access public folder
server.use(express.static('public'));


server.listen(config.port, () => {
    console.info('Express listening on port ', config.port);
})