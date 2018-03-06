//all api logic 

import axios from 'axios';

const fetchContest = contestId => {
    return axios.get(`/api/contests/${contestId}`)
    .then(resp => resp.data);
}; 