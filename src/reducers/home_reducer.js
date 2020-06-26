import { REHYDRATE } from 'redux-persist/es/constants';
import { PURGE } from 'redux-persist';

import {
    FETCH_PRODUCT
} from '../actions/types';

const initial_state = {
    token: "",
    loading: false,
    product: []
}

export default function (state=initial_state,action){
    switch (action.type) {
        // case REHYDRATE:
        //     // return action.payload.home || [];
        //     return null;

        // case PURGE:
        //     return initial_state;    

        case FETCH_PRODUCT:
            // console.log(action.payload);
            return {...state, product: action.payload};
        
        default:
            return state;
    }
}