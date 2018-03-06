import React from 'react'
import kitty from '../404-cat.gif'
import { Link } from 'react-router-dom'

const PageNotFound = () => {

    return(
        <Link to="/" className="pageNotFound">
            <img src={kitty} alt="404 - Not Found" />
        </Link>
    )
}

export default PageNotFound