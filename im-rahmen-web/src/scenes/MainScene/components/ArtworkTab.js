import React, { Component } from 'react';
import SearchField from './SearchField.js';
import ElementList from './ElementList';
import ArtworkContent from './ArtworkContent';
import ArtworkInputForm from './ArtworkInputForm';
import { getArtworks, saveArtwork, deleteArtwork, updateArtwork } from './../../../services/firebaseServices.js';

/* This component groups the artwork list and its detail page. */

class ArtworkTab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artworks: [],
      all_artworks: [],
      content: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setContent = this.setContent.bind(this);
    this.setInputForm = this.setInputForm.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.setFilledInputForm = this.setFilledInputForm.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(state, title, artist, year, artwork_id, room, beacon, info, image_base64_string) {
    var artwork = saveArtwork(state, title, artist, year, artwork_id, room, beacon, info, image_base64_string)
    this.setContent(artwork);
  }

  setInputForm() {
    const inputForm = <ArtworkInputForm 
                          handleSubmit={this.handleSubmit.bind(this)} />
    this.setState({
      content: inputForm
    });
  }

  handleUpdate(state, title, artist, year, artwork_id, room, beacon, info, image_base64_string, id) {
    var artwork = updateArtwork(state, title, artist, year, artwork_id, room, beacon, info, image_base64_string, id);
    this.setContent(artwork);
  }

  handleRemove(id) {
    deleteArtwork(id);
    this.setContent(this.state.artworks[0])
  }

  setFilledInputForm(id) {
    const inputArtwork = this.state.artworks.filter(function(item) { return item.id === id; });
    const state = inputArtwork[0]['state'];
    const title = inputArtwork[0]['title'];
    const artist = inputArtwork[0]['artist'];
    const year = inputArtwork[0]['year'];
    const artwork_id = inputArtwork[0]['artwork_id'];
    const room = inputArtwork[0]['room'];
    const beacon = inputArtwork[0]['beacon'];
    const image_base64_string = inputArtwork[0]['image_base64_string'];
    const info = inputArtwork[0]['info'];
    const inputForm = <ArtworkInputForm 
                          state={state} 
                          title={title}
                          artist={artist}
                          year={year}
                          artwork_id={artwork_id}
                          room={room} 
                          beacon={beacon}
                          image_base64_string={image_base64_string}
                          info={info}
                          id={id}
                          handleSubmit={this.handleUpdate.bind(this)} />
    this.setState({
      content: inputForm
    });
  }

  setContent(artwork) {
    this.setState({
      content: <ArtworkContent 
                    id={artwork.id}
                    state={artwork.state}
                    title={artwork.title} 
                    artist={artwork.artist} 
                    year={artwork.year}
                    artwork_id={artwork.artwork_id} 
                    room={artwork.room} 
                    beacon={artwork.beacon} 
                    image_base64_string={artwork.image_base64_string}
                    info={artwork.info}
                    setFilledInputForm={this.setFilledInputForm}
                    handleRemove={this.handleRemove}/>
    });
  }

  componentDidMount() { 
    getArtworks(this);
  }

  render() {
    const artworks = this.state.artworks;
    return (
      <div className='app'>
        <SearchField 
            hint = "Suche nach ID, Titel, Künstler..."
            context = {this}
            dataArrayName = "artworks"
            dataArray = {this.state.all_artworks}
            fieldsToBeSearchedFor = {["id", "title", "artist"]}/>
        <div id="main-content">
          <ElementList 
              elements = {artworks}
              setInputForm = {this.setInputForm}
              setContent = {this.setContent}
              isBeacon = {false}
              isExhibit = {true}
              isVersion = {false}
              elementTitle = "title"
              elementSubtitle = "artist"
              addElementText = "NEUES EXPONAT"/>
          <div className="main-content__detail">
            {this.state.content}     
          </div>
          <div className="clear" ></div>
        </div>
      </div>
    );
  }
}

export default ArtworkTab;
