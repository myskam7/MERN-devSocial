import React, {Component} from 'react';

class Contest extends Component {
    render() {
        return(

            <div className="Contest">
                {this.props.contestsId}
            </div>
        );
    }
}

export default Contest;