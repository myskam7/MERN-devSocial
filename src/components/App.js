import React, {Component} from 'react';
import PropTypes from 'prop-types';


import Header from './Header';
import ContestPreview from './ContestPreview'; 

class App extends Component {
    state = {
            pageHeader: 'Naming Contests',
            contests: this.props.initialContests
        };

        componentDidMount(){
            

        }
        componentWillUnmount(){
            console.log('unmounted');

        }
    
    
    render(){


    return (

        <div className="App">
            <Header message={this.state.pageHeader} />  
            <div>
               {this.state.contests.map(contest => 
                //key is for identifying each new data change
                <ContestPreview key={contest.id} {...contest} /> 
            )};
            </div>
        </div>
    );
  } 
};

export default App;