import React, { Component } from 'react';
import BeaconFront from './../../../images/ic_beacon_list_front.svg';

/* This component is the list of beacon images. */

class BeaconImageList extends Component {
    render() {
        return (
            <div className="list__image left inner">
                <svg id="icons_export" xmlns="http://www.w3.org/2000/svg" height="2.625rem" width="2.625rem" viewBox="0 0 192 192">
                    <title>ic_beacon_back</title> 
                    <path fill={this.props.color} d="M144,0l24,16,24,32V64c0,.08-24,48-24,48l-48,56L88,192l-32-8L24,168,0,104,8,88,40,40,104,8Z"/>
                </svg>
                <img className="beacon-image-list__front" src={BeaconFront} alt="Abbildung eines Beacon in der angegebenen Farbe"/>
            </div>
        );
    }
}

export default BeaconImageList;