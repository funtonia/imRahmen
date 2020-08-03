import React, { Component } from 'react';
import BeaconImageList from './BeaconImageList';
import NewElementButton from './NewElementButton';
import DefaultImage from './../../../images/default_image_small.svg';
import ListCircle from './ListCircle';

/* This component - the element list - is one of our most used components. It is an element list which can be customized
    with different texts, images, etc. */

class ElementList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedListElement: 0,
        };
        this.setElementContent = this.setElementContent.bind(this);
    }

    isSelected(id){
        return this.state.selectedListElement === id;
    } 

    setElementContent(element) {

        this.setState({
            selectedListElement: element.id
        });

        if(this.props.elementClassName) {
            if(this.isSelected(element.id)) {
                this.setState({
                    selectedListElement: 0
                });
            }
        }

        if (this.props.setContent !== "") {
            this.props.setContent(element);
        }
    }  

    render() {
        var listElements = this.props.elements.map((element, i) => {
            return (
                <div key={i}>
                <li className={ this.isSelected(element.id) ? 'list__li list__li--active': 'list__li' }
                    key={element.id} onClick={() => this.setElementContent(element)}>
                    <ListCircle
                        isSelected = {element.selected}
                        elementId = {element.id}
                        elementType = {this.props.isBeacon ? "beacon" : (this.props.isExhibit ? "exhibit" : "game")}
                        elementClassName = {this.props.elementClassName}/>
                    {this.props.isBeacon ? <BeaconImageList color={element.color} /> : null}
                    {this.props.isExhibit ? 
                    
                    (element.image_base64_string ? 
                    <div className="list__image left inner" style={{backgroundImage:`url(${element.image_base64_string})`}}></div>
                    :
                    <img src={DefaultImage} className="list__image left inner" alt=""/>) : null}
                    <div className="left inner list__element-text">
                        <p className="list__element-name">{element[this.props.elementTitle]}</p>
                        <p className="list__element-major">{this.props.isBeacon ? "Major: " + element[this.props.elementSubtitle] : element[this.props.elementSubtitle]}</p>
                    </div>
                    {this.props.elementClassName ? 
                    <div className="right inner list__game-element--more-options-button">
                        <svg className="list__game-element--more-options-button--image" id="icons_export" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>ic_more</title>
                        <circle cx="12" cy="3" r="3"/>
                        <circle cx="12" cy="12" r="3"/>
                        <circle cx="12" cy="21" r="3"/>
                        </svg>
                    </div>
                   : null }
                </li>
                {this.isSelected(element.id) ? this.props.openedGameContent : null}
                </div>
            )
        }, this);
        return (
            <div className= {this.props.elementClassName ? "list-container" + this.props.elementClassName : "list-container"} >
                <NewElementButton
                    addElementFunction = {this.props.setInputForm}
                    addElementText = {this.props.addElementText}
                    className = {this.props.elementClassName ? "left inner list-container__add-element-image" + this.props.elementClassName : "list-container__add-element-image left inner"}
                />
                {this.props.newGameContent}
                <ul className="list">
                    {listElements}
                </ul>
            </div>
        );
    }
}

export default ElementList;