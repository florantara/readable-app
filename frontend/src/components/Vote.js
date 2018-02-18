import React from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { connect } from 'react-redux'
import {  voteUp, voteDown } from '../actions/'

const Vote = (props) => {

    const { id, context } = props

    const upVote = () => {
        props.voteUp( id , context)
    }

    const downVote = () => {
        props.voteDown( id, context )
    }

    return(
        <div className="list-info-item">

                <FaThumbsOUp className="vote-up" onClick={upVote}/>

                <FaThumbsODown className="vote-down" onClick={downVote}/>
        </div>
    )
}



const mapDispatchToProps = dispatch => ({
    dispatch,
    voteUp: (id, context) => dispatch(voteUp(id, "upVote", context)),
    voteDown: (id, context) => dispatch(voteDown(id, "downVote", context))

})

export default connect(null, mapDispatchToProps)(Vote)
