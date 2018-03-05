import React, {Component} from 'react';


class ContestPreview extends Component {

    handleClick = () => {
        console.log(this.props.contestName);
    }

    render() {
        return(
            <div className="ContestPreview" onClick={this.handleClick}> 
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

ContestPreview.propTypes = {
    categoryName: React.PropTypes.string.isRequired,
    contestName: React.PropTypes.string.isRequired
}

export default ContestPreview;