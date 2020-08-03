import React, { Component } from 'react'; 
import onClickOutside from 'react-onclickoutside';

/* This component holds the dropdown which is opened when clicking the MoreOptionsButton. */

class MoreOptionsDropDown extends Component { 
  
  constructor(props){
    super(props);
    this.showEditMode = this.showEditMode.bind(this);
    this.delete = this.delete.bind(this);
  }

  handleClickOutside = () => {
    this.props.clickOutsideDropdownHandler()
  }

  showEditMode() {
    this.props.setFilledInputForm(this.props.id)
  }
  
  delete() {
    this.props.handleRemove(this.props.id)
    this.props.clickOutsideDropdownHandler()
  }
  
  render() {   
    return ( 
        <div id="more-options-drop-down" className={this.props.visibility}> 
            <p className="more-options-drop-down__element" onClick = {this.showEditMode} >BEARBEITEN</p>
            <p className="more-options-drop-down__element" onClick = {this.delete} >LÖSCHEN</p> 
        </div> 
    ); 
  } 
} 

export default onClickOutside(MoreOptionsDropDown);