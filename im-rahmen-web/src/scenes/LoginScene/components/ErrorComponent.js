import React, { Component } from 'react';

/* This error component is a generic component which can be filled with different texts. It is for example shown when a wrong
    email/password combination is provided. */

class ErrorComponent extends Component {
    render() {
        return (
                <div>
                    <p className = "login-form__title wrong-password-text">{this.props.title}</p>
                    <p className = "login-form__info-text wrong-password-text">{this.props.subtitle}</p>
                    <p className = "login-form__info-text-wrong-login">{this.props.infotext}</p>
                </div>
            );
    }
}

export default ErrorComponent;