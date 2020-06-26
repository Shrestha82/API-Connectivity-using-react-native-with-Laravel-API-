import {
    AUTH_REGISTER_FAIL,
    LETTER_UPDATE,
    AUTH_SUCCESS
} from '../actions/types';

const initial_state = {
    name: '',
    email:  '',
    password: '',
    user: [],
}

export default function(state = initial_state,action){
    switch (action.type) {
        case LETTER_UPDATE:    
        return {...state, [action.payload.props]: action.payload.value};

        case AUTH_SUCCESS:
            return{...state,user: action.payload,name:'',email:'',password:''}

        case AUTH_REGISTER_FAIL:
            return initial_state;

        default:
            return state;
    }
}