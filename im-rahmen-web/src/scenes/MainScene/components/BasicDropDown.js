import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import BasicDropDownElement from './BasicDropDownElement';

/* This component is used to create a dropdown element. It is for example used for the input field "Beacon" when adding a new artwork. */

class BasicDropDown extends Component {
    constructor(props) {
        super(props);
        this.isSelected = this.isSelected.bind(this);
    }

    isSelected(id){
        return this.props.selectedListElement === id;
    }

    handleClickOutside() {
        this.props.clickOutsideDropdownHandler();
    }

    render() { 
        var tabs = null;

        if(this.props.elements.length > 0) {
            tabs = this.props.elements.map(function (el, i) {
                return <BasicDropDownElement 
                    key={i}
                    element={el}
                    selected={this.isSelected(i)}
                    setSelectedListElement={this.props.setSelectedListElement}
                    hideDropDown={this.props.clickOutsideDropdownHandler}
                />
            }, this);
        }

        return (
            <ul className={this.props.visibility === "hidden" ? "hidden drop-down-list__container" + this.props.classname : "visible drop-down-list__container" + this.props.classname}>
                {tabs}
            </ul>
        );
    }
}

export default onClickOutside(BasicDropDown);