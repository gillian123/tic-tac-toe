import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Tic Tac Toe</h1>
                <h3>Try to beat me, you won't.</h3>
            </header>
        )
    }
}