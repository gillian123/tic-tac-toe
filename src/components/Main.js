import React, { Component } from 'react';
import { AppContext } from '../AppProvider';
import './Main.css';

const Square = (props) => {
    return (
        <AppContext.Consumer>
            { context => {
                return (
                    <button className={`square square-${props.index}`}>
                        I
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