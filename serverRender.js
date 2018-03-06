// fetch data from api 
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import App from './src/components/App';
import config from './config';
import { fetchContest } from './src/api';



//get api url based on contestID
const getApiUrl = contestId => {
    if(contestId) {
        return `${config.serverUrl}/api/contests/${contestId}`;
    }
    return `${config.serverUrl}/api/contests`;
};

// read Initial Data based on received contestId
const getInitialData = (contestId, apiData) => {
    if(contestId) {
        return {
            currentContestId: apiData.id,
            contests: {
                [apiData.id]: apiData
            }
        }       
    }
    return {
        contests: apiData.contests
    }
};




const serverRender = (contestId) => 
//'config.serverUrl' is the dynamic http://localhost:####
//Initiating on load
axios.get(getApiUrl(contestId))
   .then(res => {
       const initialData = getInitialData(contestId, res.data); 
       return {
           initialMarkup: ReactDOMServer.renderToString(
               <App initialData={initialData} /> 
            ),
           initialData
       };
   })
   .catch(console.error);

     export default serverRender;