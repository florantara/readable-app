import React from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { connect } from 'react-redux'
import {  voteUp, voteDown } from '../actions/'

const Vote = (props) => {

    const { postId, context } = props

    const upVote = () => {
        console.log("Up Voting")
        props.voteUp( postId , context)
    }

    const downVote = () => {
        console.log("Down Voting")
        props.voteDown( postId, context )
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
