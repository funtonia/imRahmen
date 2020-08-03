import React, { Component } from 'react';

/* This is the specific component for the quiz game input. It is added to the BasicGameInputComponent. */

class QuizGameInput extends Component {

    constructor(props) {
        super(props);
            
        this.state = { 
            title: '', 
            results: '',
            additional_info_text: '',
            wrong1: '',
            wrong2: ''
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

        var answers = [this.state.wrong1];

        if (this.state.wrong2 !== '') {
            answers.push(this.state.wrong2);
        }

        this.props.handleSubmit(
                        this.state.title, 
                        this.state.results,
                        "",
                        answers,
                        this.state.additional_info_text);
    }

    render() {
        return (
            <div>
                    <div className="game-input-form" style={{marginLeft: 0}}>
                    <p>Frage:</p>
                        <input type="text" name="title" placeholder="Frage" onChange={this.handleChange} value={this.state.title} />
                        <br />
                        <p>Antwort:</p>
                        <input type="text" name="results" placeholder="Richtige Antwort auf die Frage" onChange={this.handleChange} value={this.state.results} />
                        <br />
                        <p>Falsch 1:</p>
                        <input type="text" name="wrong1" placeholder="Eine falsche Antwort auf die Frage" onChange={this.handleChange} value={this.state.wrong1} />
                        <br />
                        <p>Falsch 2:</p>
                        <input type="text" name="wrong2" placeholder="Eine falsche Antwort auf die Frage" onChange={this.handleChange} value={this.state.wrong2} />
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

export default QuizGameInput;