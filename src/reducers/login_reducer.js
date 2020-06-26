import { 
    LOGIN_LETTER_UPDATE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_PROCESS 
} from '../actions/types';

const initial_state = {
    email: '',
    password: '',
    user: [],
    loader: false,
    error: ''
}

export default function(state = initial_state,action){
    console.log(action.type);
    switch (action.type) {
        case LOGIN_LETTER_UPDATE:
            return{...state,[action.payload.props]: action.payload.value}

        case LOGIN_PROCESS:
            return {...state,loader:true,error: '' }    

        case LOGIN_SUCCESS:
            return {...state, user: action.payload,email:'',password:'',loader: false}; 
    
        case LOGIN_FAIL:
            return {
                ...state,loader: false,
                error:'Authentication is failed!',
                password:''
            }  
    
        default:
            return state;
    }
}