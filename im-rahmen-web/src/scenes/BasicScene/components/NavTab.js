import React, { Component } from 'react';

/* These are the tabs for versions, beacons and artworks. */

export default class NavTab extends Component { 
    render() {
        return <a className={ this.props.isActive ? 'editor-nav-bar__a--active editor-nav-bar__a': 'editor-nav-bar__a' }
                    onClick={ this.props.onActiveTab }
                    >{ this.props.content }</a>
    }
}