import React, { Component } from "react";
import MainNavBar from './../BasicScene/components/MainNavBar.js';
import EditorNavBar from './../BasicScene/components/EditorNavBar.js';
import firebase from './../../firebase.js';
import LoginForm from './components/LoginForm.js';

import { handleInputFieldChangeHandler } from '../../services/loginServices.js';

import { Redirect } from 'react-router';

class LoginScene extends Component {

constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: '',
      reset_sent: false,
      emailFieldClassName: "login-form__input-field",
      passwordFieldClassName: "login-form__input-field-password-div",
      forgotPasswordClassName: "login-form__forgot-password",
      emailInputWrong: false,
      login: true,
      disableButton: true,
      wrongPasswordEntered: false
    };

    this.resetPasswordHandler = this.resetPasswordHandler.bind(this)
    this.submitLoginHandler = this.submitLoginHandler.bind(this)
    this.setInputAndTextStyle = this.setInputAndTextStyle.bind(this)
    this.handleChangeHandler = this.handleChangeHandler.bind(this)
  }

  handleChangeHandler(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    handleInputFieldChangeHandler(this, name, value)
  }

  resetPasswordHandler(e) {
    e.preventDefault()

    this.setState({
      email: '',
      login: false
    })
  }

  submitLoginHandler(e) {
    e.preventDefault();

    const {email, password} = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { this.setState({
                loading: false,
                wrongPasswordEntered: false }); })
            .catch(() => {
              this.setInputAndTextStyle(true)
            });
  }

  setInputAndTextStyle(wrongPasswordSent) {
    if (wrongPasswordSent) {
      this.setState({
        wrongPasswordEntered: true,
        loading: false,
        emailFieldClassName: "login-form__input-field wrong-password-input",
        passwordFieldClassName: "login-form__input-field-password-div wrong-password-input",
        forgotPasswordClassName: "login-form__forgot-password wrong-password-text",
        disableButton: true
      })
    } else {
      this.setState({
        emailFieldClassName: "login-form__input-field",
        passwordFieldClassName: "login-form__input-field-password-div ",
        disableButton: false
      })
    }
    
  }

  render() {
    if (firebase.auth().currentUser) {
      // User is logged in
      return <Redirect to="/main" />;
    } else if (!this.state.login) {
      this.setState({
        login: true
      })
      return <Redirect to="/reset_password"/>;
    } else {
        return (
          <div>
           <nav>
              <MainNavBar />
              <EditorNavBar 
                    isLogin = {true}/>
            </nav>
            <div className = "login-form">
              <LoginForm 
                                      handleChangeHandler = {this.handleChangeHandler} 
                                      submitLoginHandler = {this.submitLoginHandler} 
                                      resetPasswordHandler = {this.resetPasswordHandler} 
                                      emailFieldClassName = {this.state.emailFieldClassName}
                                      passwordFieldClassName = {this.state.passwordFieldClassName}
                                      forgotPasswordClassName = {this.state.forgotPasswordClassName}
                                      emailInputWrong = {this.state.emailInputWrong}
                                      wrongPasswordEntered = {this.state.wrongPasswordEntered}
                                      disableButton = {this.state.disableButton}/>
            </div>
          </div>
        );
    }
  }
}

export default LoginScene;