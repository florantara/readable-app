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
import * as actions from '../actions/Post'
import { connect } from 'react-redux'

class ManagePost extends Component {

    state={
        postData: {
            id: '',
            titleInput: '',
            bodyInput: '',
            authorInput: '',
            category: '',
        },
        redirect: false,
        showValidationPopup: false,
        editingPost: false
    }

    // TODO: Make ManagePost work for New Posts and for Edit Posts

    componentWillMount(){

        // If there is postData coming in, it means we need to Edit this post, so populate the data into state.
        if ( this.props.location && this.props.location.postData ) {
            this.setState({
                postData: {
                    id: this.props.location.postData.id,
                    titleInput: this.props.location.postData.title,
                    bodyInput: this.props.location.postData.body,
                    authorInput: this.props.location.postData.author,
                    category: this.props.location.postData.category,
                },
                editingPost: true
            })
        }


    }

    // Handle Submission for either the New Post, or the Post Edited
    handleFormSubmission = (e) => {
        e.preventDefault()

        if ( this.state.editingPost ) {
            this.onUpdatePost()
        } else {
            this.onPostSubmit()
        }
    }


    createGUID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    }

    // Submit Post
    onPostSubmit = () =>{

        // Create ID for Post
        this.setState({
            postData: {
                ...this.state.postData,
                id: this.createGUID()
            }
        })
        console.log(this.state.postData)
        // Check That fields are not empty, show valitation popup if they are:
        const allValues = Object.values(this.state.postData)
        const emptyFields = allValues.filter( field => field === '' );
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


    // Update Post
    onUpdatePost(){
        const updatedData = {
            title: this.state.postData.titleInput,
            body: this.state.postData.bodyInput
        }
        this.props.postUpdate(this.state.postData.id, updatedData)
        this.setState({
            redirect: true
        })
    }

    // Create and Add New Post
    onCreatePost = () => {

        const newPost = {
            id: this.state.postData.id,
            timestamp: new Date().getTime(),
            title: this.state.postData.titleInput,
            body: this.state.postData.bodyInput,
            author: this.state.postData.authorInput,
            category: this.state.postData.category
        }

        this.props.addNewPost(newPost)

        this.setState({
            postData: {
                ...this.state.postData,
                id: newPost.id
            },
            redirect: true
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

        if (this.state.redirect === true) {
            return <Redirect to={`/${this.state.postData.category}/${this.state.postData.id}`} />
        }

        return(
            <div className="NewPost">
                <AppBar />
                <Container>
                    <Panel>
                        <Form onSubmit={this.handleFormSubmission}>

                            <legend>{this.state.editingPost ? "Edit Post" : "New Post" }</legend>

                            <div className="mui--text-caption">Title</div>
                            <Input
                                name="title"
                                placeholder="Give it a catchy title..."
                                onChange={this.onTitleChange}
                                value={this.state.postData.titleInput}
                            />

                            <div className="mui--text-caption">Author</div>
                            <Input
                                readOnly={this.state.editingPost ? 'true' : null}
                                name="author"
                                placeholder="What's your name?"
                                onChange={this.onAuthorChange}
                                value={this.state.postData.authorInput}
                            />

                            { this.state.editingPost ?

                                <div>
                                    <div className="mui--text-caption">Category</div>
                                    <Input readOnly value={this.state.postData.category} />
                                </div>
                                :

                                <Dropdown
                                    color="accent"
                                    size="small"
                                    label={this.state.postData.category ? this.state.postData.category : "Pick a category..."}
                                >
                                    <DropdownItem onClick={() => this.handleCategory("redux")} value="redux">Redux</DropdownItem>
                                    <DropdownItem onClick={() => this.handleCategory("react")} value="react">React</DropdownItem>
                                    <DropdownItem onClick={() => this.handleCategory("udacity")} value="udacity">Udacity</DropdownItem>
                                </Dropdown>
                            }

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

export default connect(null, actions)(ManagePost)