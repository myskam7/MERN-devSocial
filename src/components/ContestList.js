import React from 'react';
import PropTypes from 'prop-types'; 

import ContestPreview from './ContestPreview.js'; 


const ContestList = ({contests, onContestClick}) => {
    return (
        <div className="ContestList" >
        {Object.keys(contests).map(contestId => 
         //key is for identifying each new data change
         <ContestPreview 
         onClick={onContestClick}
         key={contestId} 
         {...contests[contestId]} /> 
     )}
     </div>
    );

    ContestList.propTypes   = {
        contests: PropTypes.object,
        onContestClick: PropTypes.func.isRequired
    }

}

export default ContestList;