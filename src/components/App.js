import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


import Header from './Header';
import ContestPreview from './ContestPreview'; 

class App extends Component {
    state = {
            pageHeader: 'Naming Contests',
            contests: []
        };

        componentDidMount(){
            axios.get('/api/contests')
            .then(res => {
                this.setState({
                    contests: res.data.contests
                });
            
            })
            .catch(err => {
                console.log(err);
            })
            

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