import React, { Component } from 'react';

/* This is the specific component for the estimation game. It is added to the BasicGameDetailComponent. */

class EstimationGame extends Component {

    render() {
        return (
            <div>
                <div>
                    <p className="content-form__key">Frage:</p>
                    <p className="content-form__value-games">{this.props.game.title}</p>
                    <br />
                    <p className="content-form__key">Antwort:</p>
                    <p className="content-form__value-games">{this.props.game.results}</p>
                    <br/>
                    <p className="content-form__key">Einheit:</p>
                    <p className="content-form__value-games">{this.props.game.value}</p>
                    <br/>
                    <p className="content-form__key">Auflösung:</p>
                    <br />
                </div>
                <p className="content-form__info-value">{this.props.game.additional_info_text}</p>
            </div>
        );
    }

}

export default EstimationGame;