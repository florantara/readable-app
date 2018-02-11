import React , { Component } from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import Panel from 'muicss/lib/react/panel';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartO from 'react-icons/lib/fa/heart-o'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPosts } from '../actions'

class Homepage extends Component {

    componentWillMount () {
        this.props.fetchData()
    }

    render() {
        let s1 = {verticalAlign: 'middle'};
        let s2 = {textAlign: 'right'};

        return(

            <div>
                <Appbar>
                    <Container>
                        <table width="100%">
                            <tbody>
                                <tr style={s1}>
                                    <td className="mui--appbar-height">Readable App</td>
                                    <td className="mui--appbar-height" style={s2}><Button variant="raised">Create Post</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </Container>
                </Appbar>
                <Container>
                    <div className="mui--text-caption">
                        <br/>
                        <p><Link to="/">App</Link> > Homepage</p>
                    </div>
                    <div className="s-h-50"></div>
                    <div>
                        <span>Categories: </span>
                        <Link to="/category"><Button color="accent" size="small">Diet</Button></Link>
                        <Link to="/category"><Button color="accent" size="small">Excercise</Button></Link>
                        <Link to="/category"><Button color="accent" size="small">Healthy</Button></Link>
                        <Link to="/category"><Button color="accent" size="small">Food</Button></Link>

                    </div>
                    <div className="s-h-50"></div>
                    <Panel>
                        <Row>
                            <Col md={6}>
                                <p className="mui--text-headline">Posts</p>
                            </Col>
                            <Col md={6} style={s2}>
                                <Dropdown color="primary" label="Sort By">
                                    <DropdownItem link="#/link1">Option 1</DropdownItem>
                                    <DropdownItem>Option 2</DropdownItem>
                                    <DropdownItem>Option 3</DropdownItem>
                                    <DropdownItem>Option 4</DropdownItem>
                                </Dropdown>
                            </Col>
                        </Row>


                        { this.props.posts.map( post => {
                            return (
                                    <div key={post.id}>
                                        <h4><Link to="/post">{post.title}? </Link><div className="list-info"> <div className="list-info-item"><FaCommentO/> <span className="mui--text-caption">{post.commentCount}</span> </div> <div className="list-info-item"><FaHeartO/> <span className="mui--text-caption">{post.voteScore}</span> </div> <div className="list-info-item"><FaThumbsOUp className="vote-up"/></div><div className="list-info-item"> <FaThumbsODown className="vote-down"/></div> </div></h4>
                                    </div>
                                )
                            } )
                        }

                        { this.props.loading && "Loading Posts..." }



                    </Panel>

                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.data.posts,
    loading: state.data.loading
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    fetchData: () => dispatch(getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)