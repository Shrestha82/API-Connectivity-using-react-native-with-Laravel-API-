import {
    EDIT_LETTER_UPDATE,
    EDIT_SUCCESS
} from '../actions/types';

const initial_state = {
    name : '',
    email : '',
    username : '',
    phone : '',
    gender : '',
    img : '',
    updateData: []
}

export default function (state = initial_state,action){
    switch (action.type) {
        case EDIT_LETTER_UPDATE:
            return {...state, [action.payload.props]: action.payload.value};
    
        case EDIT_SUCCESS:
            return {...state,updateData: action.payload}    

        default:
            return state;
    }
}