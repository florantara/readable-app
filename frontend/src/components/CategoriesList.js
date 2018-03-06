import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button'
import { connect } from 'react-redux'
import * as actions from '../actions/Categories'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

class Categories extends Component {

    componentWillMount(){
        this.props.getCategories()
    }

    render(){

        return(
            <div className="CategoriesList">
                <span>Categories: </span>
                <Link to="/">
                    <Button color={this.props.location.pathname === '/' ? '' : 'accent'}  size="small" variant="raised">All</Button>
                </Link>
                { this.props.categories.map( category => {
                    let isActive
                    if ( category.path === this.props.activeCategory ){
                        isActive = true
                    }
                    return(
                        <Link key={category.path} to={`/category/${category.path}`}>
                            <Button color={isActive ? '' : 'accent'} size="small" variant="raised">{category.name}</Button>
                        </Link>
                    )
                } ) }
                <div className="s-h-50"></div>
            </div>
        )
    }
}

const mapStateToProps = ({categories}) => ({
    categories
})

Categories.propTypes = {
    categories: PropTypes.array,
    activeCategory: PropTypes.string
}

export default connect(mapStateToProps, actions)(withRouter(Categories))