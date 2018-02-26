import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'muicss/lib/react/button'
import { connect } from 'react-redux'
import { getCategories } from '../actions'


class Categories extends Component {

    componentWillMount(){
        this.props.fetchData()
    }

    render(){

        return(
            <div className="CategoriesList">
                <span>Categories: </span>
                { this.props.categories.map( category => {
                    let isActive
                    if ( category.path === this.props.activeCategory ){
                        isActive = true
                    }
                    return(
                        <Link key={category.path} to={`/category/${category.path}`}>
                            <Button color={isActive ? '' : 'accent'} size="small">{category.name}</Button>
                        </Link>
                    )
                } ) }
                <div className="s-h-50"></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categories: state.categories.categories
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)