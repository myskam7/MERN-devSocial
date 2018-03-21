import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
    componentDidMount(){
        this.props.fetchNames(this.props.nameIds);
    }


    render() {
        return(
            
            <div className="Contest">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Contest Descrioption</h3>
                    </div>
                    <div className="panel-body">
                        <div className="contest-description">
                            {this.props.description}
                        </div>
                    </div>
                </div>
               
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Names Suggested</h3>
                    </div>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        <li className="list-group-item">Name One...</li>
                        <li className="list-group-item">Name Two...</li>
                    </ul>
                </div>

                <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">Suggest A Name</h3>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="input-group">
                            <input type="text" placeholder="New Name Here..." className="form-control" />
                            <span className="input-group-btn">
                                <button type="submit" className="btn btn-info">Submit</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>        
     </div>

            

       
        );
    }
}

Contest.propTypes = { 
    description: PropTypes.string.isRequired,
    contestListClick: PropTypes.func.isRequired,
    fetchNames: PropTypes.func.isRequired,
    nameIds: PropTypes.array.isRequired
};

export default Contest;