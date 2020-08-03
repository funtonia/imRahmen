import React, { Component } from 'react';
import ImageUploader from './ImageUploader';
import BasicDropDown from './BasicDropDown';
import { getBeacons } from './../../../services/firebaseServices.js';

/* This component is the input form for new artworks */

class ArtworkInputForm extends Component {

  constructor(props) {
    super(props);
         
    this.state = {
      state: this.props.state, 
      title: this.props.title, 
      artist: this.props.artist, 
      year: this.props.year, 
      id: this.props.artwork_id, 
      room: this.props.room, 
      beacon: this.props.beacon, 
      info: this.props.info, 
      image_base64_string: this.props.image_base64_string,
      beacons: '',
      dropDownVisibility: 'hidden'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setImage = this.setImage.bind(this);
    this.openDropDown = this.openDropDown.bind(this);
    this.clickOutsideDropdownHandler = this.clickOutsideDropdownHandler.bind(this);
    this.setSelectedListElement = this.setSelectedListElement.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
      e.preventDefault();
    
      this.props.handleSubmit( 
                      "",
                      this.state.title, 
                      this.state.artist, 
                      this.state.year, 
                      this.state.id, 
                      this.state.room, 
                      this.state.beacon, 
                      this.state.info, 
                      this.state.image_base64_string,
                      this.props.id);
  }

  setImage(base64_string) {
    this.setState({
      image_base64_string: base64_string
    })
  }

  openDropDown() {
    this.setState({
      dropDownVisibility: 'visible'
    }) 
  }

  componentDidMount() {
    getBeacons(this);
  }

  clickOutsideDropdownHandler() {

    this.setState({
      dropDownVisibility: 'hidden'
    }) 
  }

  setSelectedListElement(element) {
    this.setState({
      beacon: element
    })
  }

  render() {
    return (
      <div className="content-detail left">
        <BasicDropDown 
            visibility = {this.state.dropDownVisibility}
            clickOutsideDropdownHandler = {this.clickOutsideDropdownHandler}
            elements = {this.state.beacons}
            setSelectedListElement = {this.setSelectedListElement}
            selectedListElement = {this.beacon}
            classname = "--artworks-beacon"
            />
        <form onSubmit={this.handleSubmit} 
              className="right">
          <div className="left">
            <ImageUploader
                  image_base64_string = {this.props.image_base64_string}
                  setImage = {this.setImage}/>
          </div>
            <div className="input-form">
              <p>Status:</p>
              <input type="text" name="state" disabled = {true} placeholder="Der Status dieses Bildes" value={this.state.state} />
              <br />
              <p>Titel:</p>
              <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
              <br />
              <p>Künstler:</p>
              <input type="text" name="artist" onChange={this.handleChange} value={this.state.artist} />
              <br />
              <p>Jahr:</p>
              <input type="text" name="year" onChange={this.handleChange} value={this.state.year} />
              <br />
              <p>ID:</p>
              <input type="text" name="id" onChange={this.handleChange} value={this.state.id} />
              <br />
              <p>Raum:</p>
              <input type="text" name="room" onChange={this.handleChange} value={this.state.room} />
              <br />
              <p>Beacon:</p>
              <input readOnly = "true" type="text" name="beacon" onChange={this.handleChange} onClick = {this.openDropDown} value={this.state.beacon.name} />
            </div>
            <div className="input-form_bottom-part">
              <p>Info:</p>
              <textarea
                      rows="10" 
                      cols="50" 
                      name="info"
                      onChange={this.handleChange} 
                      value={this.state.info} 
                      />
            </div>
            <button className="input-form__submit-button right">SPEICHERN</button>
      </form>
    </div>
    );
  }
}
ArtworkInputForm.defaultProps = {
      state: '', 
      title: '', 
      artist: '', 
      year: '', 
      id: '', 
      room: '', 
      beacon: '', 
      info: '', 
      image_base64_string: '',
      beacons: '',
      dropDownVisibility: 'hidden'
};

export default ArtworkInputForm;