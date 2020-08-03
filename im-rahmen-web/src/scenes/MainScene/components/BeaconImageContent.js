import React, { Component } from 'react';
import BeaconFront from './../../../images/ic_beacon_front.svg';
import BeaconDropDownList from './BeaconDropDownList';

/* This component holds functionality for the beacon images. */

class BeaconImageContent extends Component {

    constructor(props){
        super(props);
        this.state = {
          visibility: "hidden",
          selectedListElement: 7
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.clickOutsideDropdownHandler = this.clickOutsideDropdownHandler.bind(this);
        this.setSelectedListElement = this.setSelectedListElement.bind(this);
    }

    clickOutsideDropdownHandler() {
        this.setState({
          visibility: "hidden"
        });
    }
    
    toggleVisibility() {
        var newState = this.state.visibility === "hidden" ? "visible" : "hidden"
        this.setState({
            visibility: newState
        });
    }

    setSelectedListElement(selectedListElement){
        this.setState({
            selectedListElement: selectedListElement
        });
    }

    render() {
        return (
            <div className="left">
                <div className={this.props.changeable ? "beacon-image__change-button visible" : "beacon-image__change-button hidden"}
                    onClick={this.toggleVisibility}>
                    <p className="inner">FARBE ÄNDERN</p> 
                </div>
                <svg id="icons_export" xmlns="http://www.w3.org/2000/svg" height="10.5rem" width="10.5rem" viewBox="0 0 192 192">
                    <title>ic_beacon_back</title> 
                    <path fill={this.props.color} d="M144,0l24,16,24,32V64c0,.08-24,48-24,48l-48,56L88,192l-32-8L24,168,0,104,8,88,40,40,104,8Z"/>
                </svg>
                <img className="beacon-image__front" src={BeaconFront} alt="Abbildung eines Beacon in der angegebenen Farbe"/>
                <BeaconDropDownList 
                    setColor={this.props.setColor}
                    visibility = {this.state.visibility}
                    clickOutsideDropdownHandler = {this.clickOutsideDropdownHandler}
                    hideDropDown={this.toggleVisibility}
                    setSelectedListElement={this.setSelectedListElement}
                    selectedListElement={this.state.selectedListElement}/>
            </div>
        );
    }
}

BeaconImageContent.defaultProps = {
    color: '#CECED1'
};

export default BeaconImageContent;