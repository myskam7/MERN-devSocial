import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Contest from './Contest';
import Header from './Header';
import ContestList from './ContestList';
import * as api from '../api';

//history entries
const pushState = (obj, url) => 
    window.history.pushState(obj, '', url);

//controlling the browser back and forward links
const onPopState = handler =>  {
    window.onpopstate = handler; 
};
   

class App extends Component {
    static propTypes = {
        initialData: PropTypes.object.isRequired
    }
    //this state is top level
    state = this.props.initialData;

        componentDidMount(){
            //
          onPopState(e => {
              console.log(e.state);
              this.setState({
                  currentContestId: (e.state || {}).currentContestId
              });
          });

        }
        componentWillUnmount(){
            //to clear popState
            onPopState(null);
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

        //button 
        fetchContestList = () => {
            pushState(
                { currentContestId: null },
                '/'
            );

            api.fetchContestList()
            .then(contests => {
                this.setState({
                    currentContestId: null,
                    contests
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
               return <Contest 
                contestListClick={this.fetchContestList}
                fetchNames={this.fetchNames}
                {...this.currentContest()} />;
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