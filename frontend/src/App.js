import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom'
import Homepage from './views/Homepage'
import Category from './views/Category'
import Post from './views/Post'
import PostDetail from './views/PostDetail'
import PageNotFound from './views/PageNotFound'


class App extends Component {

    render() {
        return (

            <Switch>

                <Route exact path="/" component={Homepage} />

                <Route exact path="/category/:category" component={Category} />

                <Route exact path="/post" component={Post} />

                <Route exact path="/post/:postID" component={PostDetail} />

                <Route component={PageNotFound} />

            </Switch>
        )
    }
}

export default App;
