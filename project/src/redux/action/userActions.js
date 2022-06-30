import axios from 'axios';
import { message } from 'antd';

export const userLogin=(reqObj)=> async dispatch=>{
    
    dispatch({ type: 'Loading', payload: true })
    
    try {
        const response = await axios.post('http://localhost:5000/users/login', reqObj)
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Login Success')
        dispatch({type:'Loading', payload:false})
        setTimeout(()=>{
            window.location.href='/home'
        },500)
    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({ type: 'Loading', payload: false })
    }
}

export const userRegister=(reqObj)=> async dispatch=>{
    
    dispatch({ type: 'Loading', payload: true })
    
    try {
        const response = await axios.post('http://localhost:5000/users/register', reqObj)
        setTimeout(()=>{
            window.location.href='/login'
        },500)
        message.success('Registration Successful')
        dispatch({type:'Loading', payload:false})
    } catch (error) {
        console.log(error)
        message.error('Something went wrong')
        dispatch({ type: 'Loading', payload: false })
    }
}