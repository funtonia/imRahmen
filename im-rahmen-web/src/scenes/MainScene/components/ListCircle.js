import React, { Component } from 'react';
import { setIsSelectedBeacon, setIsSelectedArtwork, setIsSelectedGame } from './../../../services/firebaseServices.js';

/* This component is used for the list circle, an svg file. */

export default class ListCircle extends Component {
  constructor(props) {
      super(props);
      this.setSelected = this.setSelected.bind(this);
  }

  setSelected(e) {
    e.stopPropagation();
    if (this.props.elementType === "beacon") {
      setIsSelectedBeacon(this.props.elementId, !this.props.isSelected);
    } else if (this.props.elementType === "exhibit") {
      setIsSelectedArtwork(this.props.elementId, !this.props.isSelected);
    } else if (this.props.elementType === "game") {
      setIsSelectedGame(this.props.elementId, !this.props.isSelected);
    }
  } 

  render() {
    return (
      <div className={this.props.elementClassName ? "left inner list__circle" + this.props.elementClassName : "left inner list__circle"} onClick={ this.setSelected }>
        {this.props.isSelected? 
        <svg fill = "#41c19a" id="icons_export" xmlns="http://www.w3.org/2000/svg" viewBox="6 6 28 28" className="list__circle--image-selected">
            <title>ic_checkbox_checked</title>
            <path d="M20,10A10,10,0,1,0,30,20,10,10,0,0,0,20,10ZM18.67,25.09l-4.42-4.42L16,18.9l2.65,2.65L24,16.25,25.75,18Z"/>
            <path d="M20,8A12,12,0,1,1,8,20,12,12,0,0,1,20,8m0-2A14,14,0,1,0,34,20,14,14,0,0,0,20,6Z"/>
        </svg>
        :
        <svg fill = "#808080" id="icons_export" xmlns="http://www.w3.org/2000/svg" viewBox="6 6 28 28" className="list__circle--image">
            <title>ic_checkbox_empty</title>
            <path d="M20,8A12,12,0,1,1,8,20,12,12,0,0,1,20,8m0-2A14,14,0,1,0,34,20,14,14,0,0,0,20,6Z"/>
        </svg> 
        }
      </div>
    );
  }
}
