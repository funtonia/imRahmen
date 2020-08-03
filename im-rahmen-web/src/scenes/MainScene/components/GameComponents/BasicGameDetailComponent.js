import React, { Component } from 'react';

/* This is the generic component for displaying all games. It holds all the fields that all games share. */

class BasicGameDetailComponent extends Component {

    render() {
        return (
            <div className="game-detail__container">
                <p className="content-form__key">Spieltyp:</p>
                <p className="content-form__value">{this.props.game.type}</p>
                <br />
                <p className="content-form__key">Zeit:</p>
                <p className="content-form__value">{this.props.game.seconds} Sekunden</p>
                <br />
                <p className="content-form__key">Farbe:</p>
                <p className="content-form__value">{this.props.game.color}</p>
                <br />
                {this.props.specificGameContent}
            </div>
        );
    }

}

export default BasicGameDetailComponent;