import axios from 'axios';

export const getCars = () => async dispatch => {

    dispatch({ type: 'Loading', payload: true })
    
    try {
        const response = await axios.get('http://localhost:5000/cars/getcars')
        dispatch({type:'GET_ALL_CARS', payload:response.data})
        dispatch({type:'Loading', payload:false})
    } catch (error) {
        console.log(error)
        dispatch({ type: 'Loading', payload: false })
    }
}