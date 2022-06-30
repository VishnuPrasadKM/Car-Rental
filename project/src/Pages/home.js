import React, { useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { getCars } from '../redux/action/carsAction'
import {Button, Row, Col} from 'antd'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
function Home() {
    const { cars } = useSelector(state => state.carsReducer)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getCars())
    }, [])
    
    return (
        <div>
            <Navbar />
            <div>
            <Row justify='center' gutter={16} className='mt-5 mb-5'>
                {cars.map((car,index)=>{
                    return <Col lg={5} sm={24} xs={24} key={index}>
                        <div className='car p-2 boxShadow1 mt-3'>
                            <img src={car.image} className='carimg' alt={car.name}/>

                            <div className="car-content d-flex align-items-center justify-content-between">
                               <div>
                               <p>{car.name}</p>
                                <p>{car.rentPerHour} Rent per Hour/</p>
                               </div>
                            <div>
                                <Button className='mr-2'>Book Now</Button>
                            </div>
                            </div>
                        </div>
                    </Col>
                })}
            </Row>
            </div>
            <Footer />
        </div>
    )
}

export default Home