import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Contest from './Contest';
import Header from './Header';
import ContestList from './ContestList';
import * as api from '../api';

//history entries
const pushState = (obj, url) => 
    window.history.pushState(obj, '', url);



class App extends Component {
    state = {
            contests: this.props.initialContests
        };

        componentDidMount(){
            

        }
        componentWillUnmount(){
            console.log('unmounted');

        }

        fetchContest = (contestId) => {
            pushState(
                { currentContestId: contestId },
                `/contest/${contestId}`
            );

            api.fetchContest(contestId)
            .then(contest => {
                this.setState({
                    currentContestId: contest.id,
                    contests: {
                        ...this.state.contests,
                        [contest.id]: contest
                    }
                });
            });

           
        };
        // FUNCTOINS pageHeader(), currentContest(), currentContent(),
        pageHeader() {
            if (this.state.currentContestId){
                return this.currentContest().contestName; 
            }
            return 'Naming Contests';
        }

        currentContest() {
            return this.state.contests[this.state.currentContestId];
        }
       currentContent() {
           if (this.state.currentContestId) { 
               return <Contest {...this.currentContest()} />;
            }
           return  <ContestList 
           onContestClick={this.fetchContest}
           contests={this.state.contests} />;
       }
      
    
        render(){
            return (

                <div className="App">
                    <Header message={this.pageHeader()} />  
                   {this.currentContent()}
                </div>
            );
    } 
};

export default App;