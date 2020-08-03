import React, { Component } from 'react';
import Logo from './../../../images/logo.png';

/* This component is the main nav bar which holds the icon of the editor */

export default class MainNavBar extends Component {

  render() {
    return (
      <div id="main-nav-bar">
        <div className="logo">
          <img  alt="Logo im Rahmen" src={Logo}/>
          <p>Im Rahmen</p>
        </div>
      </div>
    );
  }
}