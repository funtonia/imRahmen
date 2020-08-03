import React, { Component } from 'react';

/* This component is the new element button and is used in multiple locations such as when wanting to add an artwork, a game, a beacon or a version. */

class NewElementButton extends Component {
    render() {
        return(
            <div className="list-container__add-element" onClick={this.props.addElementFunction}>
                <svg id="icons_export" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={this.props.className}>
                    <title>ic_plus</title>
                    <polygon points="24 11 13 11 13 0 11 0 11 11 0 11 0 13 11 13 11 24 13 24 13 13 24 13 24 11"/>
                </svg>
                <p className="inner list-container__add-element-text">{this.props.addElementText}</p>
            </div>
        );
    }

}

export default NewElementButton;

