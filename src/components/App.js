import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

class App extends Component {
    state = {
            pageHeader: 'Naming Contests'
        };
    

    render(){

    return (

        <div className="App">
            <Header message={this.state.pageHeader} />
            
            <div>
               ...
            </div>
        </div>
    );
  } 
};

export default App