import axios from 'axios';

import {
    FETCH_PRODUCT
} from './types';

export const homeAction = (callback)=>{
    try {
        return async function(dispatch){
            let resData = await axios.get('https://apiconnectivity.000webhostapp.com/api/list_product'); 
            const fetchData = resData.data.product;
            dispatch({
                type: FETCH_PRODUCT,
                payload: {fetchData}
            });

            // console.log(fetchData);
            callback();
        }
    } catch (err) {
        console.log(err);
    }
}