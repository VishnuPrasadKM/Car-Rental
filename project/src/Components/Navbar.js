import { Button, Container } from 'react-bootstrap'
import React from 'react'

function Navbar() {
    return (
        <div>
            <div className='header boxShadow1'>
                <Container>
                    <div className="d-flex justify-content-between">
                        <h1 id='logo'>Car Rental</h1>
                        <Button style={{ border: 'none', backgroundColor: 'inherit' }}>User</Button>
                    </div>
                </Container>
            </div>
        </div>)
}

export default Navbar