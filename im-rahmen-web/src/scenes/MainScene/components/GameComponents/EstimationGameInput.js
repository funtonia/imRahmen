import React, { Component } from 'react';

/* This is the specific component for the estimation game input. It is added to the BasicGameInputComponent. */

class EstimationGameInput extends Component {

    constructor(props) {
        super(props);
            
        this.state = { 
            title: '', 
            results: '',
            additional_info_text: ''
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
                        "",
                        "",
                        this.state.additional_info_text);
    }

    render() {
        return (
            <div>
                    <div className="game-input-form" style={{marginLeft: 0}}>
                    <p>Frage:</p>
                        <input type="text" name="title" placeholder="Schätzfrage nach einer Zahl" onChange={this.handleChange} value={this.state.title} />
                        <br />
                        <p>Antwort:</p>
                        <input type="text" name="results" placeholder="Richtige Antwortzahl der Frage" onChange={this.handleChange} value={this.state.results} />
                        <br />
                        <p>Einheit:</p>
                        <input type="text" name="value" placeholder="(optional) Einheit der geschätzten Zahl" onChange={this.handleChange} value={this.state.value} />
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

export default EstimationGameInput;