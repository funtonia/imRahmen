import React, { Component } from 'react'; 
import firebase from './../../../firebase.js';
import MainNavBar from './../../BasicScene/components/MainNavBar.js';
import EditorNavBar from './../../BasicScene/components/EditorNavBar.js';
import FormTopPart from './FormTopPart.js';

import { handleInputFieldChangeHandler } from '../../../services/loginServices.js';

/* This component is used to reset the password */

class ResetPasswordScene extends Component { 
 
  constructor(props) { 
        super(props); 
        this.state = {
          email: '',
          reset_sent: false,
          emailFieldClassName: "login-form__input-field",
          emailInputWrong: false,
          disableButton: true,
          showError: false
        };

        this.handleChangeHandler = this.handleChangeHandler.bind(this)
        this.submitResetHandler = this.submitResetHandler.bind(this)
    } 

  handleChangeHandler(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    handleInputFieldChangeHandler(this, name, value)
  }

  submitResetHandler(e) {
    e.preventDefault();

    const email = this.state.email;
    
    firebase.auth().sendPasswordResetEmail(email)
            .then(() => { this.setState({ showError: false, reset_sent: true, loading: false }); })
              .catch(() => {
                this.setState({ showError: true, loading: false });
              }
            );
  }

  spanStyle = {
    
  }
 
  render() { 
    return ( 
      <div>
           <nav>
              <MainNavBar />
              <EditorNavBar 
                    isLogin = {true}/>
            </nav>
            <div className = "login-form">
              
              <FormTopPart 
                errortitle = "Zurücksetzen fehlgeschlagen."
                errorinfotext = "Bitte versuche es erneut."
                errorsubtitle = "Die eingegebene Mail-Adresse ist nicht korrekt."
                title = "Passwort zurücksetzen"
                subtitle = "Bitte gib deine Mail-Adresse ein, um das Passwort zurückzusetzen."
                showError = {this.state.showError}/>

              <form onSubmit={this.submitResetHandler}> 
                  <input className = {this.state.emailFieldClassName}
                    name="email"
                    placeholder="E-Mail"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleChangeHandler} />
                  {this.state.emailInputWrong ? <p id = "login-form__wrong-mail-address">Keine gültige Mail-Adresse.</p> : null }
                  <input className = "login-form__button"  
                      type = "submit"  
                      value = "ZURÜCKSETZEN"
                      disabled = {(this.state.disableButton)}/> 
              </form>

              {this.state.reset_sent ? <p id = "login-form__reset-sent-info">Wir haben eine Mail an <span style={{fontWeight: 'bold'}}>{this.state.email}</span> geschickt, bitte benutze den darin enthaltenen Link, um das Passwort zurück zu setzen.</p> : null}

            </div>
      </div> 
    ); 
  } 
} 

export default ResetPasswordScene;