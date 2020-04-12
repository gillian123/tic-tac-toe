import React, { Component } from 'react';

export const AppContext = React.createContext();

export default class AppProvider extends Component {
    render() {
        return (
            <AppContext.Provider>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}