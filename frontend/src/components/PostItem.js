import React from 'react'
import { connect } from 'react-redux'
import { postDelete } from '../actions/Post'
import { Link } from 'react-router-dom'
import PostMeta from '../components/PostMeta'
import FaTrash from 'react-icons/lib/fa/trash'

const PostItem = ({post, postDelete}) => {

    const { timestamp, category, id, title, author, voteScore, commentCount } = post

    // Delete Post
    const onDeletePost = (id) =>{
        postDelete(id)
    }



    const date = new Date(timestamp)

    return(
        <div className="PostsList-item" key={id}>
            <h4>
                <Link to={`/${category}/${id}`}>{title} </Link>
                <small>by {author} on {date.toDateString()}</small>
            </h4>
            <PostMeta
                voteScore={voteScore}
                commentCount={commentCount}
                id={id}
                context="PostsList"
            />
            <Link className="PostsList-item-edit" to={{
                pathname: `/post/manage`,
                postData: post
            }}>Edit</Link>
            <FaTrash className="PostsList-item-delete" onClick={() => onDeletePost(id)}/>

        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    dispatch,
    postDelete: (id) => dispatch(postDelete(id))
})

export default connect(null, mapDispatchToProps)(PostItem)