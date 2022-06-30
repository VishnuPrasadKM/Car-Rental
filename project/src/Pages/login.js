import { Input } from "antd";
import React from "react";
import { Form, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/action/userActions";

const Login = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate();

    function onFinish(val){
        dispatch(userLogin(val))
        console.log(val)
    }
    return (
        <div className='login' height={'100%'}>
            <div className='formfield '>
                <Col className="text-center mb-3 w-100">
                    <span className="display-5 text-center" style={{color:'white'}}>Login</span>
                    <br /> 
                    </Col>
                    <Col className="text-center" >
                        <Form layout="vertical" className="form" onFinish={onFinish}>
                            <Form.Item name='Username' label='Username' rules={[{required:true}]} >
                                <Input />
                            </Form.Item>
                            <Form.Item name='Password' label='Password' rules={[{required:true}]}>
                                <Input />
                            </Form.Item>
                            <button type="submit" className="btn1">
                                Login
                            </button>
                            <a className="mt-2" onClick={()=>navigate('/register')}>New User</a>
                        </Form>
                        </Col>
                </div>
        </div>
    )
}

export default Login