import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import ContestPreview from './ContestPreview'; 

class App extends Component {
    state = {
            pageHeader: 'Naming Contests'
        };

        componentDidMount(){
            console.log('did mount');

        }
        componentWillUnmount(){
            console.log('unmounted');

        }
    
    
    render(){

    return (

        <div className="App">
            <Header message={this.state.pageHeader} />  
            
            <div>
               {this.props.contests.map(contest => 
                <ContestPreview {...contest} /> 
            )};
               
            </div>
        </div>
    );
  } 
};

export default App;