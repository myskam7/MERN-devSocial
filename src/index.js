import React from 'react'; 
import ReactDOM from 'react-dom';
// import axios from 'axios'; 

import App from './components/App';
import data from './testData';

// console.log(data.contests);

// axios.get('/api/contests')
//     .then(res => {
ReactDOM.render(
    <App initialContests={window.initialData.contests} />,
    document.getElementById('root')
);
    // })
    // .catch(console.error);




// setTimeout(()=> {
//     ReactDOM.render(
//         <h2>...</h2>,
//         document.getElementById('root')
//     );
// }, 4000)