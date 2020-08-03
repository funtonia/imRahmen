import React, { Component } from 'react';
import BeaconDropDownListElement from './BeaconDropDownListElement';
import onClickOutside from 'react-onclickoutside';

/* This component is used to create the dropdown from which one can choose the beacon color. */
class BeaconDropDownList extends Component {
    constructor(props) {
        super(props);
        this.isSelected = this.isSelected.bind(this);
    }

    isSelected(uuid){
        return this.props.selectedListElement === uuid;
    }

    handleClickOutside = () => {
        this.props.clickOutsideDropdownHandler()
    }

    render() {
        const colors = [
                { colorname: 'Grün', color: '#9FCCAD'},
                { colorname: 'Hellblau', color: '#73CDF2'},
                { colorname: 'Blau', color: '#383387'},
                { colorname: 'Violett', color: '#8A256B'},
                { colorname: 'Rosa', color: '#F199BF'},
                { colorname: 'Gelb', color: '#E3DE10'},
                { colorname: 'Rot', color: '#FF0000'},
                { colorname: 'Grau', color: '#CECED1'}
        ]
            
        var tabs = colors.map(function (el, i) {
            return <BeaconDropDownListElement 
                key={i}
                index={i}
                selected={this.isSelected(i)}
                color={ el.color } 
                colorname={ el.colorname } 
                setColor={this.props.setColor}
                setSelectedListElement={this.props.setSelectedListElement}
                hideDropDown={this.props.hideDropDown}
            />
        }, this);

        return (
            <ul className={this.props.visibility === "hidden" ? "beacon-drop-down-list__container hidden" : "beacon-drop-down-list__container visible"}>
                {tabs}
            </ul>
        );
    }
}

export default onClickOutside(BeaconDropDownList);