import React from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { connect } from 'react-redux'
import * as actions from '../actions/VotePost'
import PropTypes from 'prop-types'

const Vote = (props) => {

    const { id, context } = props

    const upVote = () => {
        props.voteUp( id , "upVote", context)
    }

    const downVote = () => {
        props.voteDown( id, "downVote", context )
    }

    return(
        <div className="list-info-item">

                <FaThumbsOUp className="vote-up" onClick={upVote}/>

                <FaThumbsODown className="vote-down" onClick={downVote}/>
        </div>
    )
}

Vote.propTYpes = {
    id: PropTypes.string.isRequired,
    context: PropTypes.string.isRequired
}

export default connect(null, actions)(Vote)