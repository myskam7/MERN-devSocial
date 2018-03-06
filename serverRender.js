// fetch data from api 
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import App from './src/components/App';
import config from './config';

const serverRender = () => 
//'config.serverUrl' is the dynamic http://localhost:####
//Initiating on load
axios.get(`${config.serverUrl}/api/contests`)
   .then(res => {
       return {
           initialMarkup: ReactDOMServer.renderToString(<App initialData={res.data} /> ),
           initialData: res.data
       }  
   })
   .catch(console.error);

     export default serverRender;