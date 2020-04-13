export const PLAYER_TURNS = {
    COMPUTER: 0,
    HUMAN: 1
}

export const ICON_CHARS = ['O', 'X'];

export const GAME_STATES = {
    COMPUTER_WIN: 0,
    HUMAN_WIN: 1,
    TIE: 2,
    CONTINUE: 3
}

const getEmptySquares = (squares) => {
    return squares
        .map((val, i) => [val, i])
        .filter(item => item[0] === null);
}

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max-min)) + min;
}

export const replace = (squares, index, playerTurn) => {
    return [...squares.slice(0, index), playerTurn, ...squares.slice(index+1, squares.length)];
}

const isTie = (squares) => {
    const emptySquares = getEmptySquares(squares);
    return emptySquares.length === 0;
}

export const checkGameState = (squares) => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i=0; i<lines.length; i++) {
        const[a,b,c] = lines[i];
        if (squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
        return isTie(squares) ? 2 : 3;
    }
}

export const findRandomMove = (squares) => {
    const emptySquares = getEmptySquares(squares);
    if (emptySquares.length > 0) {
        const randomNum = getRandom(0, emptySquares.length);
        const index = emptySquares[randomNum][1];
        return index;
    }
    return null;
}