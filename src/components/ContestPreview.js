import React, { Component } from 'react';


class ContestPreview extends Component {

    handleClick = () => {
        console.log(this.props.contestName);
    }

    render() {
        return(
            <div className="ContestPreview" onClick={this.handleClick}> 
                <div className="link category-name">
                    {this.props.categoryName}
                </div>
                <div className="link contest-name">
                    {this.props.contestName}
                </div>
            </div>
        );
    }
}

// ContestPreview.propTypes = {
//     categoryName: React.PropTypes.string,
//     contestName: React.PropTypes.string
//     onClick: React.PropTypes.func.isRequired
// }

export default ContestPreview;