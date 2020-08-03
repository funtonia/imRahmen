import React, { Component } from 'react';

/* This is the specific component for the true or false game. It is added to the BasicGameDetailComponent. */

class TrueOrFalseGame extends Component {

    render() {
        var trueOrFalse = this.props.game.results === 0 ? "Falsch" : "Wahr";

        return (
            <div>
                <div>
                    <p className="content-form__key">Frage:</p>
                    <p className="content-form__value-games">{this.props.game.title}</p>
                    <br />
                    <p className="content-form__key">Antwort:</p>
                    <p className="content-form__value-games">{trueOrFalse}</p>
                    <br/>
                    <p className="content-form__key">Auflösung:</p>
                    <br />
                </div>
                <p className="content-form__info-value">{this.props.game.additional_info_text}</p>
            </div>
        );
    }

}

export default TrueOrFalseGame;