import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import  { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { clearCurrentProfile } from './actions/profileActions';
import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute'; 

import CreateProfile from './components/createprofile/CreateProfile';
import EditProfile from './components/editprofile/EditProfile';
import AddExperience from './components/addcredentials/AddExperience';
import AddEducation from './components/addcredentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';


// import store from './store';
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
    //Clear current profile
    store.dispatch(clearCurrentProfile()); 
    //redirect to login page
    window.location.href = '/login'; 
  };
};

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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch> <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
            <PrivateRoute
              exact
              path="/edit-profile"
              component={EditProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-experience"
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/add-education"
              component={AddEducation}
            />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/post/:id" component={Post} />
        </Switch>
          <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />    
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
