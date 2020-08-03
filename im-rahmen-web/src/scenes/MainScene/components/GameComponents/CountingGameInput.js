import React, { Component } from 'react';

/* This is the specific component for the counting game input. It is added to the BasicGameInputComponent. */

class CountingGameInput extends Component {

    constructor(props) {
        super(props);
            
        this.state = { 
            title: '', 
            results: '',
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        this.props.handleSubmit(
                        this.state.title, 
                        this.state.results,
                        this.state.value, 
                        "",
                        "");
    }

    render() {
        return (
            <div>
                    <div className="game-input-form" style={{marginLeft: 0}}>
                        <p>Frage:</p>
                        <input type="text" name="title" placeholder="Frage nach der Anzahl" onChange={this.handleChange} value={this.state.title} />
                        <br />
                        <p>Antwort:</p>
                        <input type="text" name="results" placeholder="Richtige Anzahl" onChange={this.handleChange} value={this.state.results} />
                        <br />
                        <p>Einheit:</p>
                        <input type="text" name="value" placeholder="(optional) Bezeichnung des Gezählten" onChange={this.handleChange} value={this.state.value} />
                        <br />
                    </div>
                <button className="input-form__submit-button right" onClick={this.handleSubmit}>SPEICHERN</button>
            </div>
        );
    }

}

export default CountingGameInput;