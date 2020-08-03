import React, { Component } from 'react';
import { getGamesEnum, getGamesEnumKeyForValue } from './../../../../services/firebaseServices.js';
import { getSpecificGameInputContent } from './../../../../services/gamesServices.js';
import BasicDropDown from './../BasicDropDown';

/* This is the generic component for the input of all games. It holds all the fields that all games share. */

class BasicGameInputComponent extends Component {

    constructor(props) {
        super(props);
            
        this.state = {
            dropDownTypeVisibility: 'hidden',
            dropDownTimeVisibility: 'hidden',
            type: '',
            specificGameContent: '',
            seconds: '', 
            color: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openTypeDropDown = this.openTypeDropDown.bind(this);
        this.openTimeDropDown = this.openTimeDropDown.bind(this);
        this.clickOutsideTimeDropdownHandler = this.clickOutsideTimeDropdownHandler.bind(this);
        this.clickOutsideTypeDropdownHandler = this.clickOutsideTypeDropdownHandler.bind(this);
        this.setSelectedTypeElement = this.setSelectedTypeElement.bind(this);
        this.setSelectedTimeElement = this.setSelectedTimeElement.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(title, results, value, answers, additional_info_text) {
        var typeTmp = getGamesEnumKeyForValue(this.state.type);

        this.props.handleSubmit(typeTmp, this.state.seconds, this.state.color, title, results, value, answers, additional_info_text);
    }

    openTypeDropDown() {
        this.setState({
            dropDownTypeVisibility: 'visible'
        }) 
    }

    openTimeDropDown() {
        this.setState({
            dropDownTimeVisibility: 'visible'
        }) 
    }

    clickOutsideTypeDropdownHandler() {
        this.setState({
            dropDownTypeVisibility: 'hidden'
        }) 
    }

    clickOutsideTimeDropdownHandler() {
        this.setState({
            dropDownTimeVisibility: 'hidden'
        }) 
    }

    setSelectedTypeElement(element) {

        var gamesKey = getGamesEnumKeyForValue(element);

        this.setState({
            type: element,
            specificGameContent: getSpecificGameInputContent(gamesKey, this.handleSubmit)
        })
    }

    setSelectedTimeElement(element) {
        this.setState({
            seconds: element
        })
    }

    render() {

        var GamesEnum = getGamesEnum();
        var elements_tmp = []

        for (var gametype in GamesEnum) {
            elements_tmp.push(GamesEnum[gametype])
        }

        return (
            <div className="game-detail__container">
                <BasicDropDown 
                    visibility = {this.state.dropDownTypeVisibility}
                    clickOutsideDropdownHandler = {this.clickOutsideTypeDropdownHandler}
                    elements = {elements_tmp}
                    setSelectedListElement = {this.setSelectedTypeElement}
                    selectedListElement = {this.state.type}
                    classname = "--games-gametype"
                    />
                <BasicDropDown 
                    visibility = {this.state.dropDownTimeVisibility}
                    clickOutsideDropdownHandler = {this.clickOutsideTimeDropdownHandler}
                    elements = {["60", "180", "300"]}
                    setSelectedListElement = {this.setSelectedTimeElement}
                    selectedListElement = {this.state.seconds}
                    classname = "--games-time"
                    />
                <form onSubmit={this.handleSubmit}>
                    <div className="input-form" style={{marginLeft: 0}}>
                        <p>Spieltyp:</p>
                            <input type="text" readOnly = "true" name="type" onClick = {this.openTypeDropDown} onChange={this.handleChange} value={this.state.type} />
                        <br />
                        {this.state.type === '' ?
                        null :
                        <div>
                            <p>Zeit:</p>
                            <input type="text" readOnly = "true" name="seconds" onClick = {this.openTimeDropDown} onChange={this.handleChange} value={this.state.seconds} />
                            <br />
                            <p>Farbe:</p>
                            <input type="text" name="color" onChange={this.handleChange} value={this.state.color} />
                            <br />
                        </div>}
                    </div>
                    {this.state.specificGameContent}
                </form>
            </div>
        );
    }

}

export default BasicGameInputComponent;