import React, { Component } from 'react';

/* This component creates the elements used in the BeaconDropDownList */

class BeaconDropDownListElement extends Component {

    handleClick = () => {
        this.props.setColor(this.props.color);
        this.props.setSelectedListElement(this.props.index);
        this.props.hideDropDown();
    }
    
    render() {
        return (
            <li className={this.props.selected ? "beacon-drop-down-list--active" : "beacon-drop-down-list"} onClick= {this.handleClick}>
                <div className="beacon-drop-down-list__color-square" style={{backgroundColor:this.props.color}}></div>
                <p className="inner">{this.props.colorname}</p>
            </li>
        );
    }
}

export default BeaconDropDownListElement;