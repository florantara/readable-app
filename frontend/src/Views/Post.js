import React from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import Panel from 'muicss/lib/react/panel';
import Col from 'muicss/lib/react/col';
import Row from 'muicss/lib/react/row';
import FaCommentO from 'react-icons/lib/fa/comment-o'
import FaHeartbeat from 'react-icons/lib/fa/heartbeat'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import { Link } from 'react-router-dom'

const Homepage = () => {
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
                    <p><Link to="/">App</Link> > Post</p>
                </div>
                <div className="s-h-50"></div>
                <Panel>
                    <div className="list-info"> <div className="list-info-item"><FaCommentO/> <span className="mui--text-caption">5</span> </div> <div className="list-info-item"><FaHeartbeat/> <span className="mui--text-caption">503</span> </div> <div className="list-info-item"><FaThumbsOUp className="vote-up"/></div><div className="list-info-item"> <FaThumbsODown className="vote-down"/></div> </div>
                    <p className="mui--text-display2">How to fully delete a git repository created with init?</p>

                    <p>

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p>

                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </Panel>

            </Container>
        </div>
    )
}

export default Homepage