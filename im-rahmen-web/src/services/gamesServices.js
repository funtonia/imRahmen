import EstimationGame from './../scenes/MainScene/components/GameComponents/EstimationGame.js';
import CountingGame from './../scenes/MainScene/components/GameComponents/CountingGame.js';
import TrueOrFalseGame from './../scenes/MainScene/components/GameComponents/TrueOrFalseGame.js';
import QuizGame from './../scenes/MainScene/components/GameComponents/QuizGame.js';

import EstimationGameInput from './../scenes/MainScene/components/GameComponents/EstimationGameInput.js';
import CountingGameInput from './../scenes/MainScene/components/GameComponents/CountingGameInput.js';
import TrueOrFalseGameInput from './../scenes/MainScene/components/GameComponents/TrueOrFalseGameInput.js';
import QuizGameInput from './../scenes/MainScene/components/GameComponents/QuizGameInput.js';
import PlaceholderGameInput from './../scenes/MainScene/components/GameComponents/PlaceholderGameInput.js';
import React from 'react';

import { getGamesEnumKeyForValue } from './firebaseServices.js';

/* This class holds all the functions linked to games. They are a bit unhandy and thus moved to a seperate file in order to keep
    the components clean. */

export function getSpecificGameInputContent(gameType, handleSubmit) {
    switch (gameType) {
        case 'quiz':
            return <QuizGameInput 
                        type = {gameType} 
                        handleSubmit = {handleSubmit}/>
        case 'trueOrFalse':
            return <TrueOrFalseGameInput 
                        type = {gameType} 
                        handleSubmit = {handleSubmit}/>
        case 'cutouts':
            return <PlaceholderGameInput/>
        case 'counting':
            return <CountingGameInput 
                        type = {gameType} 
                        handleSubmit = {handleSubmit}/>
        case 'estimation':
            return <EstimationGameInput 
                        type = {gameType} 
                        handleSubmit = {handleSubmit}/>
        case 'difference':
            return <PlaceholderGameInput/>
        default:
            return ""
    }
}

export function getSpecificGameContent(game) {

    var type = getGamesEnumKeyForValue(game.type);

    switch (type) {
        case 'quiz':
            return <QuizGame 
                        game = {game}/>
        case 'trueOrFalse':
            return <TrueOrFalseGame 
                        game = {game}/>
        case 'counting':
            return <CountingGame 
                        game = {game}/>
        case 'estimation':
            return <EstimationGame 
                        game = {game}/>
        default:
            return ""
    }
}