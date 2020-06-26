import axios from 'axios';

import { 
    LOGIN_LETTER_UPDATE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_PROCESS
 } from './types';

 export const loginLetterUpdate = ({props,value})=>{
    //  console.log(props,value);
     return{
         type: LOGIN_LETTER_UPDATE,
         payload: {props,value}
     }
 }

 export const authLogin = ({email,password},callback)=>{
     try {
         return async function(dispatch){
            let response = await axios.post('https://apicall01.000webhostapp.com/api/user_login',{
                email: email,password: password
            })

            dispatch({type: LOGIN_PROCESS})
           const userData = response.data; 

            // console.log(userData);
           if(userData.status === true){
                dispatch({type: LOGIN_SUCCESS,payload: userData})
           }else{
               dispatch({type: LOGIN_FAIL});
           }
            
            callback();//this is basically use to pass the data to the screen.
         }
     } catch (err) {
         console.log(err);
     }
 }


