import React, { Component } from 'react'
import axios from 'axios'; 
import classnames from 'classnames';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    } 
    onSubmit(e) {
        e.preventDefault(); 
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/users/login', user)
        .then(res => console.log(res.data))
        .catch(err => this.setState({errors: err.response.data}));
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
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="email"
                 className='form-control form-control-lg'
                 placeholder="Email Address"
                 name="email"
                 value={this.state.email}
                 onChange={this.onChange} />
    
              </div>
              <div className="form-group">
                <input type="password"
                 className='form-control form-control-lg'
                 placeholder="Password
                " name="password"
                 value={this.state.password}
                 onChange={this.onChange} />
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
export default Login; 