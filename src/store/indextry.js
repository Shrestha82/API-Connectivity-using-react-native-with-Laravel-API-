import { createStore,compose,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer,persistStore } from 'redux-persist';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';

import reducers from '../reducers';

const config = {
    key: 'home', //come from reducers/index.js & then go to the home_reducer
    storage : AsyncStorage,
}

const persistedReducer = persistReducer(config, reducers);
const store = createStore(persistedReducer,{},compose(applyMiddleware(thunk)));
const persistor = persistStore(store)//.purge();

const getPersistor = () => persistor//.purge();
const getStore = () => store;
const getState = () =>{
    return store.getState();
}

export {
    getStore,
    getState,
    getPersistor
}

export default {
    getStore,
    getState,
    getPersistor
}

/* export default () =>{
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store,persistor }
} */

/* const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk))
);

export default store; */