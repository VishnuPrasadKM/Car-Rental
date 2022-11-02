import { Input } from "antd";
import React from "react";
import { Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/action/userActions";

const Login = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch()

    function onFinish(val){
        dispatch(userLogin(val))
    }
    return (
        <div className='login' height={'100%'}>
            <div className='formfield '>
                <div className="text-center mb-3 w-100">
                    <span className="display-5 text-center" style={{color:'white'}}>Login</span>
                    <br /> 
                    </div>
                    <div className="text-center" >
                        <Form layout="vertical" className="form" onFinish={onFinish}>
                            <Form.Item name='email' label='Email' rules={[{required:true,
                            message:'Please enter your mail'}]} >
                                <Input />
                            </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{required: true,
                                    message: 'Please enter your password'}]}>
                                <Input.Password />
                                </Form.Item>
                            <button type="submit" className="btn1">
                                Login
                            </button>
                            <a className="mt-2" onClick={()=>navigate('/register')}>New User</a>
                        </Form>
                        </div>
                </div>
        </div>
    )
}

export default Login