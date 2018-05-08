import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import  { Provider } from 'react-redux';


import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import store from '../src/store';
import './App.css';



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
