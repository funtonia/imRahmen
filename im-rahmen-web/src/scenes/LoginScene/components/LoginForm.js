import React, { Component } from 'react';
import FormTopPart from './FormTopPart.js';

/* This component is used for the login form. */

class LoginForm extends Component {

  constructor(props) {
      super(props);    

      this.state = {
          type: "password"
      }

      this.onEyeClick = this.onEyeClick.bind(this);
  }

  onEyeClick() {
    this.setState({
        type: this.state.type === "input" ? "password" : "input"
        // TODO: change svg color
    })
  }

  render() {
    return (
      <div>
            <FormTopPart 
                errortitle = "Login fehlgeschlagen."
                errorinfotext = "Mail-Adresse oder Passwort falsch!"
                errorsubtitle = "Bitte versuche es erneut."
                title = "Willkommen"
                subtitle = "Bitte melde dich an, um zum Editor zu gelangen."
                showError = {this.props.wrongPasswordEntered}/>
            
            <form onSubmit={this.props.submitLoginHandler}>
                <input className = {this.props.emailFieldClassName}
                    name="email"
                    placeholder="E-Mail"
                    type="email"
                    value={this.state.email}
                    onChange={this.props.handleChangeHandler} />
                {this.props.emailInputWrong ? <p id = "login-form__wrong-mail-address">Keine gültige Mail-Adresse.</p> : null }
                
                <div className = {this.props.passwordFieldClassName}>
                    <input 
                        className = "login-form__input-field-password"
                        name="password"
                        placeholder="Passwort"
                        type={this.state.type}
                        value={this.state.password}
                        onChange={this.props.handleChangeHandler} />
                    <button type = "button" className="login-form__show-password-button" onClick = {this.onEyeClick}>
                        <svg fill="#BFBFBF" className="eye-image" id="icons_export" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>ic_eye</title>
                            <path d="M12,6a10.8,10.8,0,0,1,9.83,6A10.8,10.8,0,0,1,12,18a10.8,10.8,0,0,1-9.83-6A10.8,10.8,0,0,1,12,6m0-2A12.71,12.71,0,0,0,0,12a12.71,12.71,0,0,0,12,8,12.71,12.71,0,0,0,12-8A12.71,12.71,0,0,0,12,4Z"/>
                            <path d="M12,10a2,2,0,1,1-2,2,2,2,0,0,1,2-2m0-2a4,4,0,1,0,4,4,4,4,0,0,0-4-4Z"/>
                        </svg>
                    </button>
                </div>
                <input className = "login-form__button" 
                    type = "submit" 
                    value = "LOGIN"
                    disabled = {(this.props.disableButton)}/>
            </form>
            <p onClick = {this.props.resetPasswordHandler} className = {this.props.forgotPasswordClassName}>Passwort vergessen?</p>
      </div>
    );
  }
}

export default LoginForm;