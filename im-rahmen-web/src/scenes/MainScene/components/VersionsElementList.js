import React, { Component } from 'react';
import DefaultImage from './../../../images/default_image_small.svg';

/* This component seems to be very similar to the ElementList, but has quite a different styling and functionality, which is 
    why we decided to make it a component of its own. Example: The list elements cannot be clicked in this list. */

class VersionsElementList extends Component {

    render() {

        var listElements = this.props.versionElements.map((versionElement, i) => {

            return (
                <div key={i}>
                <li className ='list__li-version' key={versionElement.id}>
                    {versionElement.image_base64_string ? 
                    <div className="list__image-version left inner" style={{backgroundImage:`url(${versionElement.image_base64_string})`}}></div>
                    :
                    <img src={DefaultImage} className="list__image-version left inner" alt=""/>}
                    <div className="left inner list__element-text-version">
                        <p className="list__element-name">{versionElement["artwork_title"]}</p>
                        <p className="list__element-major">{versionElement["artist"]}</p>
                    </div>
                    <div className="inner list__element-text-version">
                        <p className="list__element-name">{versionElement["gameType"]}</p>
                        <p className="list__element-major">{versionElement["gameTitle"]}</p>
                    </div>
                    <div className="right inner list__element-text-version--beacon">
                        <p className="list__element-name">{versionElement["beacon_name"]}</p>
                        <p className="list__element-major">Major: {versionElement["beacon_major"]}</p>
                    </div>
                </li>
                </div>
            )
        }, this);
        return (
            <div className= "list-container-version">
                <ul className="list">
                    {listElements}
                </ul>
            </div>
        );
    }
}

export default VersionsElementList;