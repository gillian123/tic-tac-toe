import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import { ICON_CHARS } from '../common';
import './Main.css';

const ICON_PLACEHOLDER = 'I';

const Square = (props) => {
    return (
        <AppContext.Consumer>
            { context => {
                const value = context.squares[props.index];
                const icon = value === null ? ICON_PLACEHOLDER : ICON_CHARS[value];
                const isEmpty = icon === ICON_PLACEHOLDER ? 'empty' : '';
                return (
                    <button className={`square square-${props.index} ${isEmpty}`}
                            onClick={() => context.humanPlay(props.index)}>
                        {icon}
                    </button>
                )
            }}
        </AppContext.Consumer>
    )
}

class Board extends Component {
    render() {
        return (
            <div className='board'>
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
        )
    }
}

class Main extends Component {
    render() {
        let textInfo = 'game info';

        return (
            <main className="main">
                <Board />
                <div className="info">{textInfo}</div>
            </main>
        )
    }
}

export default Main;