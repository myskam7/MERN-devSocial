// fetch data from api 
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import App from './src/components/App';
import config from './config';

const serverRender = () => 
//'config.serverUrl' is the dynamic http://localhost:####
axios.get(`${config.serverUrl}/api/contests`)
   .then(res => {
       return ReactDOMServer.renderToString(<App initialContests={res.data.contests} />
    );
   })
   .catch(err =>
     console.log(err));

     export default serverRender;