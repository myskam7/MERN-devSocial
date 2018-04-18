import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap'; 
import "./Login.css";

export default class Login extends Component{
    constructor(props){
        super(props); 

        this.state ={
            email: "",
            password:"",

        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;

    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault(); 
    }

    render(){
        return(
            <div className="Login">
            
        )
    }
}