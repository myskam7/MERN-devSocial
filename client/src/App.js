import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import  { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import store from './store';
import './App.css';

//Keeps us logged in
//Check for tokens
if(localStorage.jwtToken) {
  // Set AuthToken(localStorage.jwtToken);
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exparation 
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000; 
  if(decoded.exp < currentTime) {
    //Logout user 
    store.dispatch(logoutUser()); 
    //TODO: Clear current profile
    //redirect to login page
    window.location.href = '/login'; 
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store } >
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} /> 
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
            <Footer />    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
