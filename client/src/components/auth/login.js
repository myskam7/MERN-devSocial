import React, { Component } from 'react'
import axios from 'axios'; 
import classnames from 'classnames';
import { connect } from 'react-redux';
import propTypes, { PropTypes} from 'prop-types';

import { loginUser } from '../../actions/authActions';

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
              <div className="form-group">
                <input type="email"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.email})}
                 placeholder="Email Address"
                 name="email"
                 value={this.state.email}
                 onChange={this.onChange} />
                 {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </div>
              <div className="form-group">
                <input type="password"
                className={classnames('form-control form-control-lg', {
                  'is-invalid': errors.password})}
                 placeholder="Password
                " name="password"
                 value={this.state.password}
                 onChange={this.onChange} />
                 {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
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