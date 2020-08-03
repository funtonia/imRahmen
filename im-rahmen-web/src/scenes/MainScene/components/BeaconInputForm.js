import React, { Component } from 'react';
import BeaconImageContent from './BeaconImageContent';

/* This component is the input form for new beacons */

class BeaconInputForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      uuid: this.props.uuid,
      major: this.props.major,
      minor: this.props.minor,
      color: this.props.color
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
      e.preventDefault();
      this.props.handleSubmit(this.state.name, this.state.uuid, this.state.major, this.state.minor, this.state.color, this.props.id);
  }

  setColor(newColor){
    this.setState({
      color: newColor
    });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit} >
            <BeaconImageContent setColor={this.setColor} changeable={true} color={this.state.color}/>
            <div className="input-form">
              <p>Name:</p>
              <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
              <br />
              <p>UUID:</p>
              <input type="text" name="uuid" onChange={this.handleChange} value={this.state.uuid} />
              <br />
              <p>Major:</p>
              <input type="text" name="major" onChange={this.handleChange} value={this.state.major} />
              <br />
              <p>Minor:</p>
              <input type="text" name="minor" onChange={this.handleChange} value={this.state.minor} />
              <br />
              <button className="input-form__submit-button right">SPEICHERN</button>
            </div>
        </form>
    );
  }
}

BeaconInputForm.defaultProps = {
  name: '',
  uuid: '',
  major: '',
  minor: '',
  color: '#CECED1'
};

export default BeaconInputForm;
