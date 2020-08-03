import React, { Component } from 'react';
import DefaultImage from './../../../images/default_image_big.svg';

/* This component is used to upload images for the artworks. */

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        file: '',
        imagePreviewUrl: this.props.image_base64_string,
    };

    this.removeImage = this.removeImage.bind(this);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {

      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });

      this.props.setImage(reader.result);
    }

    if (file !== undefined) {
      reader.readAsDataURL(file)
    }
  }

  removeImage() {
      this.setState({
          file: '',
          imagePreviewUrl: ''
      })
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<div className="artwork-image__image" style={{backgroundImage:`url(${imagePreviewUrl})`}}></div>);
    } else {
      $imagePreview = (<div className="artwork-image__image"><img src={DefaultImage} alt="Platzhalterbild"/></div>)   
    }

    return (
      <div className = "artwork-image__container left">
          {$imagePreview}
          <div className="artwork_image__button-container">
              <input 
                  className="artwork-image__file-input" 
                  type="file"
                  onChange={(e)=>this.handleImageChange(e)} />
              <button 
                  type="button"
                  className="input-form__change-image-button">FOTO ÄNDERN</button>
              <button 
                  type="button" 
                  className="input-form__change-image-button"
                  onClick={this.removeImage}
                  disabled={this.state.imagePreviewUrl === ''}>FOTO ENTFERNEN</button>
          </div>
      </div>
    )
  }
}

ImageUploader.defaultProps = {
  image_base64_string: ''
};

export default ImageUploader;