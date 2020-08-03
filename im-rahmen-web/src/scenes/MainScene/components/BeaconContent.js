import React, { Component } from 'react';
import BeaconImageContent from './BeaconImageContent';
import MoreOptionsButton from './MoreOptionsButton';

/* This component displays the content of the different beacons. It is loaded as soon as an entry from the beacon list is tapped. */

class BeaconContent extends Component {
    
    render() {
        return (
            <div className="main-content-beacon">
                <MoreOptionsButton beacon_id={this.props.id} setFilledInputForm={this.props.setFilledInputForm} handleRemove={this.props.handleRemove}/>
                <BeaconImageContent color={this.props.color} changeable={false}/>
                <div className="content-form">
                    <p className="content-form__key">Name:</p>
                    <p className="content-form__value">{this.props.beacon_name}</p>
                    <br />
                    <p className="content-form__key">UUID:</p>
                    <p className="content-form__value">{this.props.uuid}</p>
                    <br />
                    <p className="content-form__key">Major:</p>
                    <p className="content-form__value">{this.props.major}</p>
                    <br />
                    <p className="content-form__key">Minor:</p>
                    <p className="content-form__value">{this.props.minor}</p>
                    <br />
                    <p className="content-form__key">Raum:</p>
                    <p className="content-form__value">-</p>
                    <br />
                    <p className="content-form__key">Exponat:</p>
                    <p className="content-form__value font-color-main">-</p>
                </div>
            </div>
        );
  }
}

export default BeaconContent;
