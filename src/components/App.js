import React, {Component} from 'react';
import PropTypes from 'prop-types';


import Header from './Header';
import ContestList from './ContestList';

//history entries
const pushState = (obj, url) => 
    window.history.pushState(stateObj, '', url);



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

        fetchContest =(constesId) => {
            pushState(
                { currentContestId: contestId },
                `/contest/${contestId}`
            );
        };
    
    
        render(){
            return (

                <div className="App">
                    <Header message={this.state.pageHeader} />  
                    <ContestList 
                    onContestClick={this.fetchContest}
                    contests={this.state.contests} />
                </div>
            );
    } 
};

export default App;