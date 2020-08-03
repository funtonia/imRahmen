import React, { Component } from 'react'; 
import MoreOptionsDropDown from './MoreOptionsDropDown';

/* This component holds the more options button, which can be found in multiple locations. It is used at all places where the 
    user can edit or delete: artworks, versions, games, beacons. */

class MoreOptionsButton extends Component { 
    constructor(props){
        super(props);
        this.state = {
          visibility: "hidden"
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.clickOutsideDropdownHandler = this.clickOutsideDropdownHandler.bind(this);
    }

    toggleVisibility() {
        var newState = this.state.visibility === "hidden" ? "visible" : "hidden"
        this.setState({
            visibility: newState
        });
    }

    clickOutsideDropdownHandler() {
        this.setState({
          visibility: "hidden"
        });
    }
  
    render() {
        return (
            <div className="main-content__more-options-button right">
                <svg 
                    className="main-content__more-options-button--image ignore-react-onclickoutside" 
                    id="icons_export" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    onClick = { this.toggleVisibility }>
                <title>ic_more</title>
                <circle cx="12" cy="3" r="3"/>
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="21" r="3"/>
                </svg>
                <MoreOptionsDropDown 
                    type="beacons" 
                    id={this.props.beacon_id}
                    visibility = {this.state.visibility}
                    clickOutsideDropdownHandler = {this.clickOutsideDropdownHandler}
                    setFilledInputForm = {this.props.setFilledInputForm}
                    handleRemove={this.props.handleRemove}/>
            </div>
        );
    }
} 

export default MoreOptionsButton;