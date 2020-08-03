import React, { Component } from 'react';
import NavTab from './NavTab';
import DropDownNav from './DropDownNav';
 
/* This component is the editor nav bar containing the different tabs (artworks, beacons, versions) and the dropdown used for the
   login/logout handling. */

export default class EditorNavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTabId: 1,
      visibility: "hidden"
    };
    this.isActive = this.isActive.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.clickOutsideDropdownHandler = this.clickOutsideDropdownHandler.bind(this);
  }
  
  isActive(id){
    return this.state.selectedTabId === id;
  }
  
  setActiveTab(selectedTabId){
    this.setState({ selectedTabId });
    this.props.handleChange(selectedTabId);
  }

  clickOutsideDropdownHandler() {
    this.setState({
      visibility: "hidden"
    });
  }
 
  toggleVisibility() {
    var newState = this.state.visibility === "hidden" ? "visible" : "hidden"
    this.setState({
      visibility: newState
    });
  }
  
  render() {
    const tab_content = [
          { id: 1, name: 'EXPONATE'},
          { id: 2, name: 'BEACONS'},
          { id: 3, name: 'VERSIONEN'}
    ]
     
    var tabs = tab_content.map(function (el, i) {
      return <NavTab 
        key={ i }
        content={ el.name } 
        isActive={ this.isActive(el.id) } 
        onActiveTab={ this.setActiveTab.bind(this, el.id) }
      />
    }, this);

    if (this.props.isLogin) {
      return (
      <div id="editor-nav-bar-container"> 
        <div id="editor-nav-bar" className="center"> </div>
      </div> 
      );
    } else {
      return (
      <div id="editor-nav-bar-container"> 
        <div id="editor-nav-bar" className="center"> 
          <div className="right">
            <a  className="editor-nav-bar__a ignore-react-onclickoutside" 
                onClick = { this.toggleVisibility }>ACCOUNT</a>
            <DropDownNav 
                visibility = {this.state.visibility}
                clickOutsideDropdownHandler = {this.clickOutsideDropdownHandler}/>
          </div>
          <div>{tabs}</div>
        </div> 
      </div> 
      );}
    }         
    
}