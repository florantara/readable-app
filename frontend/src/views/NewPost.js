import React, { Component } from 'react'
import AppBar from '../components/AppBar'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import Button from 'muicss/lib/react/button'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import { addNewPost } from '../actions'
import { connect } from 'react-redux'
import  uuidv1  from 'uuid/v1'

let s1 = {verticalAlign: 'middle'};
let s2 = {textAlign: 'right'};

class NewPost extends Component {

    state={
        titleInput: '',
        bodyInput: '',
        authorInput: '',
        category: '',
        newPostId: null
    }

    onPostSubmit = (e) =>{
        e.preventDefault()

        // id - UUID should be fine, but any unique id will work
        // timestamp - [Timestamp] Can in whatever format you like, you can use Date.now() if you like.
        // title - [String]
        // body - [String]
        // author - [String]
        // category - Any of the categories listed in categories.js. Feel free to extend this list as you desire.

        const newPost = {
            id: uuidv1(),
            timestamp: new Date().getTime(),
            title: this.state.titleInput,
            body: this.state.bodyInput,
            author: this.state.authorInput,
            category: this.state.category
        }
        this.props.addPost(newPost)
        this.setState({
            titleInput: '',
            bodyInput: '',
            authorInput: '',
            category: '',
            newPostId: newPost.id
        },
        () => {
            this.handleSuccessRedirect()
        }
        )
    }

    onTitleChange = (e) => {
        this.setState({
            titleInput: e.target.value
        })
    }

    onAuthorChange = (e) => {
        this.setState({
            authorInput: e.target.value
        })
    }

    onPostBodyChange = (e) => {
        this.setState({
            bodyInput: e.target.value
        })
    }

    handleCategory = (category) => {
        this.setState({
            category: category
        })
    }

    handleSuccessRedirect = () =>{
        window.location.href= "/"
    }

    render(){

        return(
            <div className="NewPost">
                <AppBar />
                <Container>
                    <Panel>
                        <Form onSubmit={this.onPostSubmit}>

                            <table width="100%">
                                <tbody>
                                    <tr style={s1}>
                                        <td><legend>New Post</legend></td>
                                        <td style={s2}>
                                            <Dropdown
                                                color="accent"
                                                size="small"
                                                label={this.state.category ? this.state.category : "Category..."}
                                            >
                                                <DropdownItem onClick={() => this.handleCategory("redux")} value="redux">Redux</DropdownItem>
                                                <DropdownItem onClick={() => this.handleCategory("react")} value="react">React</DropdownItem>
                                                <DropdownItem onClick={() => this.handleCategory("udacity")} value="udacity">Udacity</DropdownItem>
                                            </Dropdown>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mui--text-caption">Title</div>
                            <Input
                                name="title"
                                placeholder="Give it a catchy title..."
                                onChange={this.onTitleChange}
                                value={this.state.titleInput}
                            />
                            <div className="mui--text-caption">Author</div>
                            <Input
                                name="author"
                                placeholder="What's your name?"
                                onChange={this.onAuthorChange}
                                value={this.state.authorInput}
                            />

                            <Textarea
                                name="body"
                                placeholder="Start writing..."
                                onChange={this.onPostBodyChange}
                                value={this.state.bodyInput}
                                rows="10"
                            />

                             <Button
                                 variant="raised"
                                 value="Submit Post"
                                 type="submit"
                                 color="primary"
                                 >
                                 Submit
                             </Button>
                        </Form>
                    </Panel>
                </Container>
            </div>
        )
    }


}

const mapDispatchToProps = dispatch => ({
    dispatch,
    addPost: (newPost) => dispatch(addNewPost(newPost))
})

export default connect(null, mapDispatchToProps)(NewPost)