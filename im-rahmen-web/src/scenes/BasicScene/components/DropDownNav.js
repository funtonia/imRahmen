import React, { Component } from 'react'; 
import firebase from './../../../firebase.js';
import onClickOutside from 'react-onclickoutside';
import { Redirect } from 'react-router';

/* This component is used to for the dropdowns used in the nav bar. */

class DropDownNav extends Component { 
  
  constructor(props){
    super(props);
    
    this.logout = this.logout.bind(this);

    this.state = {
      logged_out: false
    }
  }

  handleClickOutside = () => {
    this.props.clickOutsideDropdownHandler()
  }

  logout() {
    firebase.auth().signOut().then(function() {

        this.setState({
          logged_out: true
        });
    }.bind(this), function(error) {
    });
  }
  
  render() {   
    if (this.state.logged_out) {
      return <Redirect to="/" />; 
    } else {
      return ( 
        <div id="drop-down-nav" className={this.props.visibility}> 
          <p className="drop-down-nav__a" onClick = {this.logout}>ABMELDEN</p>
          <a className="drop-down-nav__a">ACCOUNT VERWALTEN</a> 
        </div> 
      ); 
    } 
  } 
} 

export default onClickOutside(DropDownNav);