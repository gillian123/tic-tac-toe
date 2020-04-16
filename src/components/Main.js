import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import { ICON_CHARS, GAME_STATES, PLAYER_TURNS } from '../common';
import './Main.css';

const ICON_PLACEHOLDER = 'I';

const Square = (props) => {
    return (
        <AppContext.Consumer>
            { context => {
                const value = context.squares[props.index];
                const icon = value === null ? ICON_PLACEHOLDER : ICON_CHARS[value];
                const isEmpty = icon === ICON_PLACEHOLDER ? 'empty' : '';
                let winningSquare = '';
                if (context.gameState.winningSquares) {
                    winningSquare = context.gameState.winningSquares.includes(props.index) ? 'win' : '';
                }
                return (
                    <button className={`square square-${props.index} ${isEmpty} ${winningSquare}`}
                            onClick={() => context.humanPlay(props.index)}>
                        <span className='icon'>{icon}</span>
                    </button>
                )
            }}
        </AppContext.Consumer>
    )
}

const Restart = (props) => {
    return (
        <AppContext.Consumer>
            {context => {
                return (
                    <button className={'newGame'} ref={props.restartRef}
                            onClick={() => context.newGame()} />    
                )
            }}
        </AppContext.Consumer>
    )
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.boardRef = React.createRef();
        this.restartRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.context.gameState.status === GAME_STATES.CONTINUE) {
            this.boardRef.current.classList.remove('end');
            this.restartRef.current.classList.remove('end');
            this.boardRef.current.classList.remove('tie');
        } else {
            this.boardRef.current.classList.add('end');
            this.restartRef.current.classList.add('end');
        }
        if (this.context.gameState.status === GAME_STATES.TIE) {
            this.boardRef.current.classList.add('tie');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className={'board'} ref={this.boardRef}>
                    <Square index={0} />
                    <Square index={1} />
                    <Square index={2} />
                    <Square index={3} />
                    <Square index={4} />
                    <Square index={5} />
                    <Square index={6} />
                    <Square index={7} />
                    <Square index={8} />
                </div>
                <Restart restartRef={this.restartRef} />
            </React.Fragment>
        )
    }
}
Board.contextType = AppContext;

class Main extends Component {
    render() {
        let textInfo = '';
        if (this.context.gameState.status === GAME_STATES.TIE) {
            textInfo = 'Tie!';
        } else if (this.context.gameState.status === GAME_STATES.CONTINUE) {
            if (this.context.playerTurn === PLAYER_TURNS.HUMAN){ 
                textInfo = 'It\'s your turn';
            } else {
                textInfo = 'It\'s the computer\'s turn';
            }
        } else if (this.context.gameState.status === GAME_STATES.HUMAN_WIN) {
            textInfo = 'You win!';
        } else {
            textInfo = 'Computer wins!';
        }

        return (
            <main className="main">
                <Board />
                <div className="info">{textInfo}</div>
            </main>
        )
    }
}
Main.contextType = AppContext;

export default Main;