import React, { Component } from 'react';
import { PLAYER_TURNS, findRandomMove, GAME_STATES,
         replace, checkGameState } from './common';

const THINKING_TIME = 500;
let PLAYER_START = 0;
export const AppContext = React.createContext();

export default class AppProvider extends Component {

    initState = {
        squares: new Array(9).fill(null),
        playerTurn: PLAYER_START,
        gameState: GAME_STATES.CONTINUE
    }

    state = {
        squares: this.initState.squares,
        playerTurn: this.initState.playerTurn,
        gameState: this.initState.gameState
    }

    initGame = () => {
        if (this.state.playerTurn === PLAYER_TURNS.COMPUTER) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(() => {
                const randomMove = findRandomMove(this.state.squares);
                this.computerPlay(randomMove);
            }, THINKING_TIME);
        }
    }

    applyState = (prevState, index) => {
        const squares = prevState.squares;
        const nextPlayerTurn = 1 - prevState.playerTurn;
        const nextSquares = replace(squares, index, prevState.playerTurn);
        const gameState = checkGameState(nextSquares);
        return {
            gameState: gameState,
            playerTurn: nextPlayerTurn,
            squares: nextSquares
        }
    }

    computerPlay = (index) => {
        if ( this.state.gameState === GAME_STATES.CONTINUE && this.state.squares[index] === null 
            && this.state.playerTurn === PLAYER_TURNS.COMPUTER) {
            this.setState(prevState => this.applyState(prevState, index));
        }
    }

    componentDidMount() {
        this.initGame();
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}