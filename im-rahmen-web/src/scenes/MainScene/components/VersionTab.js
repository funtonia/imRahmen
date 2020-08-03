import React, { Component } from 'react';
import firebase from './../../../firebase.js';
import SearchField from './SearchField.js';
import VersionContent from './VersionContent';
import VersionInputForm from './VersionInputForm';
import ElementList from './ElementList';

import { getVersions, saveVersion } from './../../../services/firebaseServices.js';

/* This component groups the version list and its detail page. */

class VersionTab extends Component {

  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      createDate: '',
      changeDate: '-',
      isActive: false,
      gameIDs: [],
      versions: [],
      all_versions: [],
      content: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setInputForm = this.setInputForm.bind(this);
    this.setContent = this.setContent.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(title, createDate, changeData, isActive, gameIDs) {
    var version = saveVersion(title, createDate, changeData, isActive, gameIDs)
    this.setContent(version);
  }

  setInputForm() {
    const inputForm = <VersionInputForm 
                          handleSubmit={this.handleSubmit.bind(this)} />
    this.setState({
      content: inputForm
    });
  }

  setContent(version) {

    console.log(version.gameIDs);

    this.setState({
      content: <VersionContent 
                    id = {version.id}
                    title={version.title}
                    createDate={version.createDate}
                    changeDate={version.changeDate} 
                    isActive={version.isActive} 
                    gameIDs={version.gameIDs}/>
    });
  }

  componentDidMount() { 
    getVersions(this);
  }

  render() {
    const versions = this.state.versions;

    return (
      <div className='app'>
        <SearchField 
            hint="Suche nach Name, Datum..."
            context = {this}
            dataArrayName = "versions"
            dataArray = {this.state.all_versions}
            fieldsToBeSearchedFor = {["name", "date"]}/>
        <div id="main-content">
        <ElementList 
              elements = {versions}
              setInputForm = {this.setInputForm}
              setContent = {this.setContent}
              isBeacon = {false}
              isExhibit = {false}
              isVersion = {true}
              elementTitle = "title"
              elementSubtitle = "changeDate"
              addElementText = "NEUE VERSION"/>
          <div className="main-content__detail">
            {this.state.content}
          </div>
          <div className="clear" ></div>
        </div>
      </div>
    );
  }
}

export default VersionTab;
