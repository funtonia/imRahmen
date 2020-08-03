import React, { Component } from 'react';

/* This component creates the elements for the BasicDropDown */

class BasicDropDownElement extends Component {

    handleClick = (e) => {
        this.props.setSelectedListElement(this.props.element);
        this.props.hideDropDown();
    }

    render() { 
        return (
            <div >
                <li className={this.props.selected ? "drop-down-list--active" : "drop-down-list"} onClick={this.handleClick}>
                    <p className="inner">{this.props.element.name !== undefined ? this.props.element.name : this.props.element}</p>
                </li>
            </div>
        );
    }
}

export default BasicDropDownElement;