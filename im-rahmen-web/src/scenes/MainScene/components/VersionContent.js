import React, { Component } from 'react';
import VersionsElementList from './VersionsElementList';
import { getVersionElements, publishVersion } from './../../../services/firebaseServices.js';

/* This component displays the content of the different versions. It is loaded as soon as an entry from the version list is tapped. */

class VersionContent extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            gameIDs: [],
            title: '', 
            createDate: '',
            changeData: '',
            isActive: '',
            versionElements: []
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        publishVersion(this.props.id);
    }

    componentDidMount() {
        this.setVersionElements(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setVersionElements(nextProps)
    }

    setVersionElements(props) {
        var gameIDs = [];
        if (props.gameIDs !== undefined) {
            gameIDs = props.gameIDs;
        }

        getVersionElements(this, gameIDs);
    }

    render() {

        return (
            <div>
                <div className="main-content__more-options-button right">
                    <svg className="main-content__more-options-button--image" id="icons_export" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <title>ic_more</title>
                    <circle cx="12" cy="3" r="3"/>
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="12" cy="21" r="3"/>
                    </svg>
                </div>
                <div className = "main-content__detail-info-part left">
                    <div className="content-form-version">
                        <p className="content-form__key">Name:</p>
                        <p className="content-form__value">{this.props.title}</p>
                        <br />
                        <p className="content-form__key">Erstellt:</p>
                        <p className="content-form__value">{this.props.createDate}</p>
                        <br />
                        <p className="content-form__key">Geändert:</p>
                        <p className="content-form__value">{this.props.changeDate}</p>
                        <br />
                    </div>   
                    <button className="input-form__submit-button right" onClick={this.handleSubmit}>VERSION VERÖFFENTLICHEN</button>
                    <VersionsElementList 
                        versionElements = {this.state.versionElements}/> 
                </div>
            </div>
        );
  }
}

export default VersionContent;