import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import {AiOutlineCar} from 'react-icons/ai'
import {BsPaypal} from 'react-icons/bs'

const Welcome = () => {

    const navigate=useNavigate();

    return (
        <div className='text-center pt-4 welcome'>
            <span className='display-5'>Welcome to Car Rental's </span>
            <br />
            <CardGroup className='container mt-4 '>
                <Card>
                    <Card.Body>
                        <Card.Title>Step 1</Card.Title>
                        <Card.Text>
                            <h2 className='text-center mt-2 display-2' onClick={()=>navigate('/login')}><a href='#'>Login <FiLogIn /></a></h2>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Step 2</Card.Title>
                        <Card.Text>
                            <h2 className='text-center mt-2 display-2' style={{color:'green'}}>Select <AiOutlineCar /></h2>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Step 3</Card.Title>
                        <Card.Text>
                           <h2 className='text-center mt-2 display-2' style={{color:'purple'}}>Pay <BsPaypal/></h2>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
            <br/ >
            <span className='display-4'>Where renting made simple</span>
            <br />
            <h5 className='text-muted'>New to the site? Then <a onClick={()=>navigate('/register')} style={{color:'blue'}}>Register</a> Now</h5>
        </div>
    )
}

export default Welcome