import React, { Component } from 'react';
import BasicDropDown from './../BasicDropDown';

/* This is the specific component for the true or false game input. It is added to the BasicGameInputComponent. */

class TrueOrFalseGameInput extends Component {
    
    constructor(props) {
        super(props);
            
        this.state = { 
            title: '', 
            results: '',
            additional_info_text: '',
            dropDownVisibility: 'hidden',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.openDropDown = this.openDropDown.bind(this);
        this.clickOutsideDropdownHandler = this.clickOutsideDropdownHandler.bind(this);
        this.setSelectedElement = this.setSelectedElement.bind(this);
    }

    openDropDown() {
        this.setState({
            dropDownVisibility: 'visible'
        }) 
    }

    clickOutsideDropdownHandler() {
        this.setState({
            dropDownVisibility: 'hidden'
        }) 
    }

    setSelectedElement(element) {

        this.setState({
            results: element
        })
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {

        var result = this.state.results === "Wahr" ? 1 : 0

        this.props.handleSubmit(
                        this.state.title, 
                        result,
                        "",
                        "",
                        this.state.additional_info_text);
    }

    render() {
        return (
            <div>
                <BasicDropDown 
                    visibility = {this.state.dropDownVisibility}
                    clickOutsideDropdownHandler = {this.clickOutsideDropdownHandler}
                    elements = {["Wahr", "Falsch"]}
                    setSelectedListElement = {this.setSelectedElement}
                    selectedListElement = {this.state.results}
                    classname = "--games-trueOrFalse"
                    />
                <div className="game-input-form" style={{marginLeft: 0}}>
                    <p>Aussage:</p>
                    <input type="text" name="title" placeholder="Aussage, die wahr oder falsch ist" onChange={this.handleChange} value={this.state.title} />
                    <br />
                    <p>Antwort:</p>
                    <input type="text" name="results" readOnly = "true" placeholder="Wahr oder falsch" onChange={this.handleChange} onClick = {this.openDropDown} value={this.state.results} />
                    <br />
                </div>
                <div className="input-form_bottom-part">
                    <p>Auflösung:</p>
                    <textarea
                            rows="4" 
                            cols="50" 
                            name="additional_info_text"
                            onChange={this.handleChange}
                            placeholder="(Optional) Nachdem die Frage beantwortet wurde, wird dieser Text angezeigt, um näher auf die Antwort einzugehen." 
                            value={this.state.additional_info_text} 
                            />
                </div>
                <button className="input-form__submit-button right" onClick={this.handleSubmit}>SPEICHERN</button>
            </div>
        );
    }

}

export default TrueOrFalseGameInput;