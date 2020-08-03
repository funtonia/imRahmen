/* This class holds some of the functions needed for the login. */

export function checkCorrectEmailInput(emailAddress, context) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( re.test(emailAddress) ) {
        context.setState({
          emailFieldClassName: "login-form__input-field",
          emailInputWrong: false,
          ["email"]: emailAddress,
          disableButton: false
        });
    } else {
        // invalid email, show an error to the user.
        context.setState({
          emailFieldClassName: "login-form__input-field wrong-password-input",
          emailInputWrong: true,
          ["email"]: emailAddress,
          disableButton: true
        })
    }
}

export function handleInputFieldChangeHandler(context, name, value) {
    if (context.state.wrongPasswordEntered) {
      // everything is red, reset to normal colours
      context.setInputAndTextStyle(false)
    } 
    
    if ( name === "email") {
        checkCorrectEmailInput(value, context);
    } else {
          context.setState({
            [name]: value
          });
    }
}