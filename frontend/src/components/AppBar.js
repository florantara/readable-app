import React from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import logo from '../img/readable-logo.svg'

let s1 = {verticalAlign: 'middle'};
let s2 = {textAlign: 'right', width: '200px'};
let s3 = {width: "300px", textAlign: "right"}

const AppBar = ({showCreateButton, showImportButton, onImportSomePosts, importingPosts}) => {

    const triggerImportSomePosts = () => {
        onImportSomePosts()
    }
    return(
        <div className="AppBar">
            <Appbar>
                <Container>
                    <table width="100%">
                        <tbody>
                            <tr style={s1}>
                                <td className="mui--appbar-height">
                                    <Link to ="/">
                                        <img src={logo} alt="Readable Logo" width="100"/>
                                    </Link>
                                </td>
                                {importingPosts &&
                                    <td style={s3}>
                                        <p style={{color: "white"}}>Importing posts...</p>
                                    </td>
                                }
                                {showImportButton &&
                                    <td style={s3}>
                                        <Button title="Import External Posts to make this more fun!" variant="raised" onClick={() => triggerImportSomePosts()}>
                                        Import Some Posts</Button>
                                    </td>
                                }
                                { showCreateButton &&
                                    <td className="mui--appbar-height" style={s2}>
                                        <Link to="/new-post">
                                            <Button variant="raised">Create Post</Button>
                                        </Link>
                                    </td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </Container>
            </Appbar>
            <div className="s-h-50"></div>
        </div>

    )
}

export default AppBar