import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import MainNavigate from './src/MainNavigate';
// import {getStore,getPersistor} from './src/store/indextry';
import  store  from './src/store';

export default class App extends Component {
  render(){
   /*  const store = getStore();
    const persistor = getPersistor(); */

    return (
      <Provider store={ store }>
          {/* <PersistGate loading={null} persistor={persistor} > */}
            <MainNavigate />
          {/* </PersistGate> */}
      </Provider>
    );
  }
}

/* const styles ={
    bodyStyle:{
      background: 'black',
    }
} */
