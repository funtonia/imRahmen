import React, { Component } from 'react';
import SearchField from './SearchField.js';
import ElementList from './ElementList';
import BeaconInputForm from './BeaconInputForm';
import BeaconContent from './BeaconContent';
import { getBeacons, saveBeacon, updateBeacon, deleteBeacon } from './../../../services/firebaseServices.js';

/* This component groups the beacon list and its detail page. */

class BeaconTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beacons: [],
      all_beacons: [],
      content: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.setContent = this.setContent.bind(this);
    this.setInputForm = this.setInputForm.bind(this);
    this.setFilledInputForm = this.setFilledInputForm.bind(this);
  }

  handleSubmit(name, uuid, major, minor, color) {
    var beacon = saveBeacon(name, uuid, major, minor, color);
    this.setContent(beacon);
  }

  handleUpdate(name, uuid, major, minor, color, id) {
    var beacon = updateBeacon(name, uuid, major, minor, color, id);
    this.setContent(beacon);
  }

  handleRemove(id) {
    deleteBeacon(id);
    this.setContent(this.state.beacons[0])
  }
  
  setInputForm() {
      const inputForm = <BeaconInputForm handleSubmit={this.handleSubmit.bind(this)} />
      this.setState({
        content: inputForm
      });
  }

  setFilledInputForm(id) {
    const inputBeacon = this.state.beacons.filter(function(item) { return item.id === id; });
    const name = inputBeacon[0]['name']
    const uuid = inputBeacon[0]['uuid']
    const major = inputBeacon[0]['major']
    const minor = inputBeacon[0]['minor']
    const color = inputBeacon[0]['color']
    const inputForm = <BeaconInputForm 
                          name={name} 
                          uuid={uuid}
                          major={major}
                          minor={minor}
                          color={color}
                          id={id}
                          handleSubmit={this.handleUpdate.bind(this)} />
    this.setState({
      content: inputForm
    });
  }

  setContent(beacon) {
    this.setState({
      content: <BeaconContent 
                  id={beacon.id} 
                  beacon_name={beacon.name} 
                  uuid={beacon.uuid} 
                  major={beacon.major} 
                  minor={beacon.minor} 
                  color={beacon.color} 
                  setFilledInputForm={this.setFilledInputForm}
                  handleRemove={this.handleRemove}/>
    });
  }

  componentDidMount() { 
    getBeacons(this);
  } 
  
  render() {
    const beacons = this.state.beacons;
    return (
      <div className='app'>
        <SearchField 
            hint="Suche nach Name, Major, UUID..."
            context = {this}
            dataArrayName = "beacons"
            dataArray = {this.state.all_beacons}
            fieldsToBeSearchedFor = {["name", "major", "uuid"]}/>
        <div id="main-content">
          <ElementList 
              context = {this}
              elements = {beacons}
              setInputForm = {this.setInputForm}
              setContent = {this.setContent}
              isBeacon = {true}
              isExhibit = {false}
              isVersion = {false}
              elementTitle = "name"
              elementSubtitle = "major"
              addElementText = "NEUER BEACON"/>
          <div className="main-content__detail">
          {this.state.content}
          </div>
          <div className="clear" ></div>
        </div>
      </div>
    );
  }
}

export default BeaconTab;
