import React, { Component } from 'react';
import { PLAYER_TURNS, findRandomMove, GAME_STATES,
         replace, checkGameState, findBestMove } from './common';

const THINKING_TIME = 500;
export const AppContext = React.createContext();

export default class AppProvider extends Component {

    initState = {
        squares: new Array(9).fill(null),
        playerTurn: 1,
        gameState: {
            status: GAME_STATES.CONTINUE,
            winningSquares: new Array(3).fill(null)
        }
    }

    state = {
        squares: this.initState.squares,
        playerTurn: this.initState.playerTurn,
        gameState: this.initState.gameState,
        humanPlay: (index) => { this.humanPlay(index); },
        newGame: () => { this.initNewGame(); }
    }

    initGame = () => {
        if (this.state.playerTurn === PLAYER_TURNS.COMPUTER) {
            setTimeout(() => {
                const randomMove = findRandomMove(this.state.squares);
                this.computerPlay(randomMove);
            }, THINKING_TIME);
        }
    }

    initNewGame = () => {
        this.setState(() => {
            return {
                squares: this.initState.squares,
                gameState: this.initState.gameState,
                playerTurn: 1 - this.initState.playerTurn
            }
        }, () => {
            this.initState.playerTurn = 1 - this.initState.playerTurn;
            this.initGame();
        })
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
        if (this.state.gameState.status === GAME_STATES.CONTINUE && this.state.squares[index] === null 
            && this.state.playerTurn === PLAYER_TURNS.COMPUTER) {
            this.setState(prevState => this.applyState(prevState, index));
        }
    }

    humanPlay = (index) => {
        if (this.state.gameState.status === GAME_STATES.CONTINUE && this.state.squares[index] === null
            && this.state.playerTurn === PLAYER_TURNS.HUMAN) {
            this.setState(prevState => { 
                return this.applyState(prevState, index); 
            }, () => {
                if (this.state.gameState.status === GAME_STATES.CONTINUE 
                    && this.state.playerTurn === PLAYER_TURNS.COMPUTER) {
                    setTimeout(() => {
                        this.makeAIMove();
                    }, THINKING_TIME);
                }
            })
        }
    }

    makeAIMove = () => {
        const bestMove = findBestMove(this.state.squares, this.state.playerTurn);
        if (bestMove != null) { this.computerPlay(bestMove); }
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