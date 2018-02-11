import React from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import Panel from 'muicss/lib/react/panel';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartbeat from 'react-icons/lib/fa/heartbeat'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { Link } from 'react-router-dom'

const Category = () => {
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
                    <p><Link to="/">App</Link> > Category</p>
                </div>
                <div className="s-h-50"></div>
                <Panel>
                    <Row>
                        <Col md={6}>
                            <p className="mui--text-headline">Posts about Diet</p>
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

                    <div>
                        <h4><Link to="/post">to fully delete a git repository created with init? </Link><div className="list-info"> <div className="list-info-item"><FaCommentO/> <span className="mui--text-caption">5</span> </div> <div className="list-info-item"><FaHeartbeat/> <span className="mui--text-caption">503</span> </div> <div className="list-info-item"><FaThumbsOUp className="vote-up"/></div><div className="list-info-item"> <FaThumbsODown className="vote-down"/></div> </div></h4>
                    </div>
                    <div>
                        <h4><Link to="/post">to fully delete a git repository created with init? </Link><div className="list-info"> <div className="list-info-item"><FaCommentO/> <span className="mui--text-caption">5</span> </div> <div className="list-info-item"><FaHeartbeat/> <span className="mui--text-caption">503</span> </div> <div className="list-info-item"><FaThumbsOUp className="vote-up"/></div><div className="list-info-item"> <FaThumbsODown className="vote-down"/></div> </div></h4>
                    </div>
                    <div>
                        <h4><Link to="/post">to fully delete a git repository created with init? </Link><div className="list-info"> <div className="list-info-item"><FaCommentO/> <span className="mui--text-caption">5</span> </div> <div className="list-info-item"><FaHeartbeat/> <span className="mui--text-caption">503</span> </div> <div className="list-info-item"><FaThumbsOUp className="vote-up"/></div><div className="list-info-item"> <FaThumbsODown className="vote-down"/></div> </div></h4>
                    </div>
                </Panel>

            </Container>
        </div>
    )
}

export default Category