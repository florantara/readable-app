import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AppBar from '../components/AppBar'
import Container from 'muicss/lib/react/container'
import Panel from 'muicss/lib/react/panel'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Textarea from 'muicss/lib/react/textarea'
import Button from 'muicss/lib/react/button'
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import { addNewPost } from '../actions/Post'
import { connect } from 'react-redux'
import  uuidv1  from 'uuid/v1'

class NewPost extends Component {

    state={
        postData: {
            titleInput: '',
            bodyInput: '',
            authorInput: '',
            category: '',
        },
        newPostId: null,
        postCreated: false,
        showValidationPopup: false
    }

    onPostSubmit = (e) =>{
        e.preventDefault()
        const allValues = Object.values(this.state.postData)
        const emptyFields = allValues.filter( field => field === '' );
        console.log(emptyFields.length)
        if ( emptyFields.length > 0) {
            this.setState({
                showValidationPopup: true
            })
        } else {
            this.onCreatePost()
        }


    }

    onOkValidationMsg = () => {
        this.setState({
            showValidationPopup: false
        })
    }

    onCreatePost = () => {

        const newPost = {
            id: uuidv1(),
            timestamp: new Date().getTime(),
            title: this.state.postData.titleInput,
            body: this.state.postData.bodyInput,
            author: this.state.postData.authorInput,
            category: this.state.postData.category
        }

        this.props.addPost(newPost)

        this.setState({
            postData: {
                titleInput: '',
                bodyInput: '',
                authorInput: '',
                category: ''
            },
            newPostId: newPost.id,
            postCreated: true
        })
    }

    onTitleChange = (e) => {
        this.setState({
            postData: {
                ...this.state.postData,
                titleInput: e.target.value
            }
        })
    }

    onAuthorChange = (e) => {
        this.setState({
            postData: {
                ...this.state.postData,
                authorInput: e.target.value
            }
        })
    }

    onPostBodyChange = (e) => {
        this.setState({
            postData: {
                ...this.state.postData,
                bodyInput: e.target.value
            }
        })
    }

    handleCategory = (category) => {
        this.setState({
            postData: {
                ...this.state.postData,
                category: category
            }
        })
    }

    render(){

        if (this.state.postCreated === true) {
            return <Redirect to={`/post/${this.state.newPostId}`} />
        }

        return(
            <div className="NewPost">
                <AppBar />
                <Container>
                    <Panel>
                        <Form onSubmit={this.onPostSubmit}>

                            <legend>New Post</legend>

                            <div className="mui--text-caption">Title</div>
                            <Input
                                name="title"
                                placeholder="Give it a catchy title..."
                                onChange={this.onTitleChange}
                                value={this.state.postData.titleInput}
                            />

                            <div className="mui--text-caption">Author</div>
                            <Input
                                name="author"
                                placeholder="What's your name?"
                                onChange={this.onAuthorChange}
                                value={this.state.postData.authorInput}
                            />

                            <Dropdown
                                color="accent"
                                size="small"
                                label={this.state.postData.category ? this.state.postData.category : "Pick a category..."}
                            >
                                <DropdownItem onClick={() => this.handleCategory("redux")} value="redux">Redux</DropdownItem>
                                <DropdownItem onClick={() => this.handleCategory("react")} value="react">React</DropdownItem>
                                <DropdownItem onClick={() => this.handleCategory("udacity")} value="udacity">Udacity</DropdownItem>
                            </Dropdown>

                            <Textarea
                                name="body"
                                placeholder="Start writing..."
                                onChange={this.onPostBodyChange}
                                value={this.state.postData.bodyInput}
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
                             { this.state.showValidationPopup &&
                                 <div className="NewPost-ValidationMsg">
                                     <div>
                                         <p>Oops, looks like you are missing something... :)</p>
                                         <Button color="accent" onClick={this.onOkValidationMsg}>Ok, let me see</Button>
                                     </div>
                                 </div>
                             }

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