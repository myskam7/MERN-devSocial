import React from 'react'; 
import ReactDOM from 'react-dom';

const color = Math.random() > 0.5 ? 'green' : 'red';

ReactDOM.render(
   <h2>
    Hello React with JSX -- <p style={{color: color}}> {Math.random()}</p>
   </h2>,
    document.getElementById('root')
);