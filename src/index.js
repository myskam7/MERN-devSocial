import React from 'react'; 
import ReactDOM from 'react-dom';

import App from './components/App';
import data from './testData';

// console.log(data.contests);


ReactDOM.render(
    <App contests={data.contests}/>,
    document.getElementById('root')
);


// setTimeout(()=> {
//     ReactDOM.render(
//         <h2>...</h2>,
//         document.getElementById('root')
//     );
// }, 4000)