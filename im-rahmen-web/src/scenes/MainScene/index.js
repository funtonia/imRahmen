import React, { Component } from 'react';
import MainNavBar from './../BasicScene/components/MainNavBar.js';
import EditorNavBar from './../BasicScene/components/EditorNavBar.js';
import VersionTab from './components/VersionTab.js';
import ArtworkTab from './components/ArtworkTab.js';
import BeaconTab from './components/BeaconTab.js';
import { Redirect } from 'react-router';
import firebase from './../../firebase.js'

class MainScene extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedTabId: 1,
    };
    this.setContent = this.setContent.bind(this);
  }
  
  setContent(selectedTabId){
    this.setState({
      selectedTabId
    });
  }

  render() {
    const tabs = [ <ArtworkTab/>, <BeaconTab/>, <VersionTab/>]

    // if user logs out
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          // User is not signed in
          return <Redirect to="/" />;
        }
    });

    if (firebase.auth().currentUser) {
      // User is logged in
      return (
            <div>
              <nav>
                <MainNavBar />
                <EditorNavBar handleChange={this.setContent}/>
              </nav>
              <div id="editor-main-content" className="center">
                {tabs[this.state.selectedTabId - 1]}
              </div>
            </div>
          );
    } else {
        // User is not signed in
        return <Redirect to="/" />
    }
  }
}

export default MainScene;