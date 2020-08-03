import React, { Component } from 'react';
import ElementList from './ElementList';
import DefaultImage from './../../../images/default_image_big.svg';
import BasicGameInputComponent from './GameComponents/BasicGameInputComponent';
import BasicGameDetailComponent from './GameComponents/BasicGameDetailComponent';
import { getGames, saveGame } from './../../../services/firebaseServices.js';
import { getSpecificGameContent } from './../../../services/gamesServices.js';
import MoreOptionsButton from './MoreOptionsButton';

/* This component displays the content of the different artworks. It is loaded as soon as an entry from the artwork list is tapped. */

class ArtworkContent extends Component {
    constructor() {
        super();

        this.state = {
            games: [],
            gameContent: '', 
            newGameContent: ''
        }

        this.setGameContent = this.setGameContent.bind(this);
        this.setGameInput = this.setGameInput.bind(this);
    }

    componentDidMount() {
        this.setGames(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.setGames(nextProps)
    }

    handleSubmit(type, seconds, color, title, results, value, answers, additional_info_text) {

        var game = saveGame(type, seconds, color, title, results, value, answers, additional_info_text, this.props.id);
        this.setGameContent(game);

        this.setState({
            newGameContent: ''
        })
    }

    setGameContent(game) {

        var specificGameContentTmp = getSpecificGameContent(game)

        this.setState({
            gameContent: <BasicGameDetailComponent 
                            game = {game}
                            specificGameContent = {specificGameContentTmp}/>
        });
    }

    setGameInput() {
        const inputForm = <BasicGameInputComponent handleSubmit={this.handleSubmit.bind(this)} />
        this.setState({
            newGameContent: inputForm
        });
    }

    setGames(props) {
        var id = '';
        if (props.id !== undefined) {
            id = props.id;
        }

        getGames(this, id);
    }

    render() {
        const games = this.state.games;

        let $imagePreview = null;
        var image_url = this.props.image_base64_string

        if (image_url) {
            $imagePreview = (<div className="artwork-image__image" style={{backgroundImage:`url(${image_url})`}}></div>);
        } else {
            $imagePreview = (<div className="artwork-image__image"><img src={DefaultImage} alt="Kunstwerk"/></div>)       
        }

        return (
            <div>
                <MoreOptionsButton beacon_id={this.props.id} setFilledInputForm={this.props.setFilledInputForm} handleRemove={this.props.handleRemove}/>
                <div className = "main-content__detail-info-part">
                    <div className="left">
                        {$imagePreview}
                    </div>
                    <div className="content-form">
                        <p className="content-form__key">Status:</p>
                        <p className="content-form__value">{this.props.state}</p>
                        <br />
                        <p className="content-form__key">Titel:</p>
                        <p className="content-form__value">{this.props.title}</p>
                        <br />
                        <p className="content-form__key">Künstler:</p>
                        <p className="content-form__value">{this.props.artist}</p>
                        <br />
                        <p className="content-form__key">Jahr:</p>
                        <p className="content-form__value">{this.props.year}</p>
                        <br />
                        <p className="content-form__key">ID:</p>
                        <p className="content-form__value">{this.props.artwork_id}</p>
                        <br />
                        <p className="content-form__key">Raum:</p>
                        <p className="content-form__value">{this.props.room}</p>
                        <br/>
                        <p className="content-form__key">Beacon:</p>
                        <br />
                    </div>   
                    <p className="content-form__key">Info:</p>
                    <p className="content-form__info-value">{this.props.info}</p>
                    <ElementList 
                        elements = {games}
                        setInputForm = {this.setGameInput}
                        setContent = {this.setGameContent}
                        isBeacon = {false}
                        isExhibit = {false}
                        isVersion = {false}
                        elementTitle = "type"
                        elementSubtitle = "title"
                        addElementText = "NEUES SPIEL"
                        elementClassName = "-games"
                        openedGameContent = {this.state.gameContent}
                        newGameContent = {this.state.newGameContent}/> 
                </div>
            </div>
        );
  }
}

export default ArtworkContent;