import { combineReducers } from 'redux';

import register from './register_reducer';
import login from './login_reducer';
import home from './home_reducer';
import edit from './edit_reducer';

export default combineReducers({
    register,
    login,
    home,
    edit,
})