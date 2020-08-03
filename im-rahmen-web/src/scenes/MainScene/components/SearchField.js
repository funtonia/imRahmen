import React, { Component } from 'react';
import { checkForStringAndUpdate } from '../../../services/searchServices.js';

/* This component is a search-as-you-type searchfield used to search for artworks, beacons and versions. */

export default class SearchField extends Component {

  constructor(props) {
    super(props);
    
    this.onSearchEntered = this.onSearchEntered.bind(this);
  }

  onSearchEntered(e) {
    e.preventDefault();

    var searchstring = e.target.value

    checkForStringAndUpdate(this.props.context, this.props.dataArrayName, this.props.dataArray, this.props.fieldsToBeSearchedFor, searchstring)
  }

  render() {
    return (
      <input 
          id="search-field" 
          type="text" 
          name="search-field" 
          onChange={this.onSearchEntered}
          placeholder={this.props.hint}/>
    );
  }
}