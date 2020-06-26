import axios from 'axios';

import {
    LETTER_UPDATE,
    AUTH_REGISTER_FAIL,
    AUTH_SUCCESS
} from './types';

export const letterUpdate = ({props,value})=>{
    console.log(props,value);
    return{
        type: LETTER_UPDATE,
        payload: {props,value}
    }
}

export const authRegister = ({name,email,password})=>{
    try {
            return async function(dispatch){
                let response = await axios.post('https://apicall01.000webhostapp.com/api/user_create_store',{
                name: name,
                email: email,
                password: password
            })
            console.log(response.data);
            const userData = response.data;
            if(userData.status == true){
                dispatch({type: AUTH_SUCCESS,payload: userData})
            }else{
                dispatch({ type: AUTH_REGISTER_FAIL });
            }            
        }
    /* .then(console.log(data))
    .catch(error => console.log(error)); */    
    } catch (err) {
        console.log(err);
    }
}