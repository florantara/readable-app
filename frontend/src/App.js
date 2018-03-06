import React, { Component } from 'react'
import './App.css'

import { Route, Switch } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Category from './pages/Category'
import PostDetail from './pages/PostDetail'
import NewPost from './pages/NewPost'
import PageNotFound from './pages/PageNotFound'


class App extends Component {

    render() {
        return (

            <Switch>

                <Route exact path="/" component={Homepage} />

                <Route exact path="/category/:category" component={Category} />

                <Route exact path="/:category/:postID" component={PostDetail} />

                <Route exact path="/new-post" component={NewPost} />

                <Route component={PageNotFound} />

            </Switch>
        )
    }
}

export default App
