import React, { Component } from 'react';

/* This is the specific component for the counting game. It is added to the BasicGameDetailComponent. */

class CountingGame extends Component {

    render() {
        return (
            <div>
                <p className="content-form__key">Frage:</p>
                <p className="content-form__value-games">{this.props.game.title}</p>
                <br />
                <p className="content-form__key">Antwort:</p>
                <p className="content-form__value-games">{this.props.game.results}</p>
                <br/>
                <p className="content-form__key">Einheit:</p>
                <p className="content-form__value-games">{this.props.game.value}</p>
                <br />
            </div>
        );
    }

}

export default CountingGame;