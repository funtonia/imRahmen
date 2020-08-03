import React, { Component } from 'react';
import ErrorComponent from './ErrorComponent.js';

/* This component is the top part of the login form. We split it up to reduce code, as it is used 
    for several views (login, forgot password, ...) */

class FormTopPart extends Component {
    render() {
        if (this.props.showError) {
            return (
                <ErrorComponent 
                    title = {this.props.errortitle}
                    subtitle = {this.props.errorsubtitle}
                    infotext =  {this.props.errorinfotext}/>
            );
        } else {
            return (
                <div>
                    <p className = "login-form__title">{this.props.title}</p>
                    <p className = "login-form__info-text">{this.props.subtitle}</p>
                </div>
        );
        }
    }
}

export default FormTopPart;