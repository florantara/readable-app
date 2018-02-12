import React from 'react'
import Appbar from 'muicss/lib/react/appbar'
import Container from 'muicss/lib/react/container'
import Button from 'muicss/lib/react/button'

let s1 = {verticalAlign: 'middle'};
let s2 = {textAlign: 'right'};

const AppBar = () => {
    return(
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
    )
}

export default AppBar