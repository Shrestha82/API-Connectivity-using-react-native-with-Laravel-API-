import React, { Component } from 'react';
import { View,Text,FlatList,ActivityIndicator,RefreshControl,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import Constants from 'expo-constants';

import ProductFlatList from './ProductFlatList';
import { homeAction } from '../actions';
import { ListProduct } from '../component/ListItem';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = { 
            ImageSource: null,
            p: [],
            refreshing: false,
         }
    }

    static navigationOptions = {
        headerTitle: 'APICALL',
        headerStyle:{ backgroundColor: 'red'},
        headerTitleStyle:{ color: 'white'},
    }

    fetchData = async()=>{
        const res = await axios.get('https://apicall01.000webhostapp.com/api/list_product')
        // .then(res=> res.data)
        .then(res => this.setState({ p: res.data.product} ))
        .catch(err => console.log(err));
    }
    
    componentDidMount(){
        this.fetchData();
    }  

    renderRow ( {item} ) {
        console.log(item)
        return(
            <ProductFlatList item={item} />
        )
        /* (
          <ListItem
            roundAvatar
            title={item.pname}
            subtitle={item.shortdes}
            // avatar={{uri:item.avatar_url}}
          />
        ) */
    }

    _onRefresh(){
        this.setState({refreshing: true});
        this.fetchData().then(()=>{
            this.setState({refreshing: false})
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
            <View containerStyle={{marginBottom: 40,marginTop: 0}}>
                <FlatList
                    data={this.state.p}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refreshing} 
                            onRefresh={this._onRefresh.bind(this)} 
                        />
                    }
                />
            </View>
            </SafeAreaView>
        )
    }

}

const styles = {
    container: {
        flex: 1, /* alignItems: 'center', justifyContent: 'center' */
        marginTop: Constants.statusBarHeight,
      },
}

function mapStateToProps(home){
    const { product } = home.home;
    const products = _.map(product, (val)=>{
        return { ...val};
    });
    return { products };
}

export default connect(mapStateToProps,{homeAction})(Home);
