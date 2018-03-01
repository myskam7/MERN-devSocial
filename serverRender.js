// fetch data from api 

import config from './config';
import axios from 'axios';

//'config.serverUrl' is the dynamic http://localhost:####
axios.get(`${config.serverUrl}/api/contests`)
   .then(res => {
       console.log(res.data);
   })
   .catch(err => err)