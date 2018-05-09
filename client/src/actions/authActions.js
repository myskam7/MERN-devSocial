import axios from 'axios'; 
import jwt_decode from 'jwt-decode';

import { GET_ERRORS } from './types';
import { SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

// registerUser func & dispatch func 
export const registerUser = (userData, history) => dispatch => {
      axios.post('/api/users/register', userData)
      .then(res => history.push('./login')) 
      .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
      
};

//Loign - Get user Token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
        // Save to local storage
        const { token } = res.data;
        //Set token to local storage
        localStorage.setItem('jwtToken', token); 
        //set token to Auth header
        setAuthToken(token); 
        //Decode token to get user data
        const decoded = jwt_decode(token);  
        //Set current user
        dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Set logged in User
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}