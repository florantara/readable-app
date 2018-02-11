import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom'
import Homepage from './views/Homepage'
import Category from './views/Category'
import Post from './views/Post'
import PageNotFound from './views/PageNotFound'


class App extends Component {

    componentDidMount(){
        fetch("http://localhost:3001/categories", { headers: { 'Authorization': 'coolToken' }})
        .then( res => res.json())
        .then( res => console.log(res))

    }
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
