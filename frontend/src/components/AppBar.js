import React from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'
import { Link } from 'react-router-dom'
import logo from '../img/readable-logo.svg'
import PropTypes from 'prop-types'

let s1 = {verticalAlign: 'middle'};
let s2 = {textAlign: 'right', width: '200px'};

const AppBar = ({showCreateButton}) => {

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
                                { showCreateButton &&
                                    <td className="mui--appbar-height" style={s2}>
                                        <Link to="/post/manage">
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

AppBar.propTypes = {
    showCreateButton: PropTypes.bool
}

export default AppBar