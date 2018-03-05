import React, {Component} from 'react';


class ContestPreview extends Component {

    render() {
        return(
    <div className="ContestPreview"> 
        <div className="category-name">
            {contest.categoryName}
        </div>
        <div className="contest-name">
            {contest.contestName}
        </div>
    </div>
        );
    }
};

export default ContestPreview;