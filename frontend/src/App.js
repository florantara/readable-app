import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom'
import Homepage from './Views/Homepage'
import Category from './Views/Category'
import Post from './Views/Post'
import PageNotFound from './Views/PageNotFound'

class App extends Component {
    render() {
        return (

            <Switch>

                <Route exact path="/" component={Homepage} />

                <Route exact path="/category" component={Category} />

                <Route exact path="/post" component={Post} />

                <Route component={PageNotFound} />

            </Switch>
        )
    }
}

export default App;
