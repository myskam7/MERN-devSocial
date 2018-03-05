import React from 'react';


import ContestPreview from './ContestPreview'; 


const ContestList = ({contests, onContestClick}) => {
    return (
        <div className="ContestList" >
        {contests.map(contest => 
         //key is for identifying each new data change
         <ContestPreview 
         onClick={onContestClick}
         key={contest.id} 
         {...contest} /> 
     )}
     </div>
    );

    ContestList.propTypes   = {
        contests: React.PropTypes.array,
        onContestClick: React.PropTypes.func.isRequired
    }

}

export default ContestList;