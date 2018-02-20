import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom'
import Homepage from './views/Homepage'
import Category from './views/Category'
import PostDetail from './views/PostDetail'
import NewPost from './views/NewPost'
import PageNotFound from './views/PageNotFound'


class App extends Component {

    render() {
        return (

            <Switch>

                <Route exact path="/" component={Homepage} />

                <Route exact path="/category/:category" component={Category} />

                <Route exact path="/post/:postID" component={PostDetail} />

                <Route exact path="/new-post" component={NewPost} />

                <Route component={PageNotFound} />

            </Switch>
        )
    }
}

export default App;
