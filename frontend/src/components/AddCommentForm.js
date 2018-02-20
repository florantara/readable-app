import React from 'react'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import Button from 'muicss/lib/react/button'

const AddCommentForm = (props) => {

    const { onCommentSubmit, onAuthorChange, onTextareaChange, textComment, authorName, onCancel} = props;
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
                     color="primary"
                     >
                     Submit
                 </Button>
                 <Button onClick={onCancel}>Cancel</Button>
            </Form>
        </div>
    )
}

export default AddCommentForm