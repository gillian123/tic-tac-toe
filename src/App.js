import React, { Component } from 'react';
import AppProvider from './AppProvider';
import Header from './components/Header';
import Main from './components/Main';
import './App.css';

export default class App extends Component {
    render() {
        return (
            <AppProvider>
                <div className="app">
                    <Header />
                    <Main />
                </div>
            </AppProvider>
        )
    }
}