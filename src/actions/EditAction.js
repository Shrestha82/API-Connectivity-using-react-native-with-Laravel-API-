import axios from 'axios';

import {
    EDIT_LETTER_UPDATE,
    EDIT_SUCCESS
}from './types';

export const editLatterUpdate = ({props, value})=>{
    console.log(props,value);
    return{
        type: EDIT_LETTER_UPDATE,
        payload: {props, value}
    }
}

export const authEdit = ({name,email,username,phone,gender,id})=>{
    try {
        return async function(dispatch){
            let response = await axios.post(`https://apicall01.000webhostapp.com/api/update/${id}`,{
                name: name,
                email: email,
                username: username,
                phone: phone,
                gender: gender
            });
            
            const updateData = response.data;
            console.log(updateData);
            if(updateData.status == true){
                dispatch({type: EDIT_SUCCESS,payload: updateData})
            }else{
                alert('Something gonna wrong');
            }
        }
    } catch (err) {
        console.log(err);
    }
}


