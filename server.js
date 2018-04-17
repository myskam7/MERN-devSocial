import express, {static} from "express";
import fs from "fs";
import sassMiddleware from "node-sass-middleware";
import { join } from "path";
import { json } from "body-parser";

import apiRouter from "./api";
import { port, host } from "./config";

const server = express();

server.use(json());


//SASS
server.use(sassMiddleware({
  src: join(__dirname, 'sass'),
  dest: join(__dirname, 'public')
}));


//Effective Javascript (EJS) 
server.set('view engine', 'ejs');


import serverRender from "./serverRender"; 

server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({initialMarkup, initialData}) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error)
      res.status(404).send("Request Not Good");
    });  
});

//Express middleware to access folders
server.use('/api', apiRouter);
server.use(static('public'));


server.listen(port, host, () => {
  console.info('Express listening on port ', port);
});

