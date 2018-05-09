import React, { Component } from 'react'
import axios from 'axios'; 
import classnames from 'classnames';
import { connect } from 'react-redux';
import propTypes, { PropTypes} from 'prop-types';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
      if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard')
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/dashboard'); 
      }


      if(nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    } 

    onSubmit(e) {
        e.preventDefault(); 
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData);
        // axios.post('/api/users/login', user)
        // .then(res => console.log(res.data))
        // .catch(err => this.setState({errors: err.response.data}));
    } 

  render() {
     

    const { errors } = this.state;
    return (
     
      <div>
      <div className="login"> 
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your DevConnector account</p>
            <form noValidate onSubmit={this.onSubmit}>
          
            <TextFieldGroup 
            placeholder="Email address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            />

            <TextFieldGroup 
            placeholder="Passworkd"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            />
              
              <input type="submit"
               className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login); 