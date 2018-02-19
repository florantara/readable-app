import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import Button from 'muicss/lib/react/button'

const AddCommentForm = ({ onCommentSubmit, onAuthorChange, onTextareaChange, textComment, authorName}) => {

    return(
        <div className="AddCommentForm">

            <Form onSubmit={onCommentSubmit}>
                <legend>New Comment</legend>
                <Input
                    name="author"
                    placeholder="Your name..."
                    onChange={onAuthorChange}
                    value={authorName}
                />
                <Textarea
                    name="comment"
                    placeholder="Your comment..."
                    onChange={onTextareaChange}
                    value={textComment}
                    rows="3"
                />

                 <Button
                     variant="raised"
                     className="AddCommentForm-Button"
                     value="Add Comment"
                     type="submit"
                     >
                     Submit
                 </Button>
            </Form>
        </div>
    )
}

export default AddCommentForm