import { Input } from "antd";
import React from "react";
import { Form } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { userRegister } from "../redux/action/userActions";

const Register = () => {

    const navigate=useNavigate();
    const dispatch=useDispatch();

    function onFinish(val){
        dispatch(userRegister(val))
    }

    return (
        <div className='login register' height={'100%'}>
            <div className='formfield'>
                <div className="text-center mb-3 w-100">
                    <span className="display-5 text-center" style={{color:'white'}}>Register</span>
                    <br /> 
                </div>
                <div className="text-center" >
                    <Form layout="vertical" className="form" onFinish={onFinish}>
                        <Form.Item name="email" label="E-mail" rules={[
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your E-mail!' },
                            ]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='username' label='Username' rules={[{required:true}]} >
                            <Input />
                        </Form.Item>
                            <Form.Item name="password" label="Password" rules={[{required: true,
                                message: 'Please input your password of minimum 6 Characters!', min:6}]}hasFeedback>
                            <Input.Password />
                            </Form.Item>
                    
                            <Form.Item name="confirm" label="Confirm Password"  dependencies={['password']}
                            hasFeedback rules={[{ required: true,
                                message: 'Please confirm your password!'},({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) { return Promise.resolve() }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                                }})]}>
                            <Input.Password />
                            </Form.Item>                        
                        <button type="submit" className="btn1">
                            Register
                        </button>
                        <a className="mt-2" onClick={()=>navigate('/login')}>Existing User</a>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register