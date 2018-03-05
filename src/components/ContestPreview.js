import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

class ContestPreview extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleClick = () => {
        this.props.onClick(this.props.id);
        // console.log(this.props.contestName);
    }

    render() {
        return (
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

ContestPreview.propTypes = {
    id: PropTypes.number.isRequired,
    categoryName: PropTypes.string,
    contestName: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default ContestPreview;