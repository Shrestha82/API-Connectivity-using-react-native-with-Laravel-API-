import React, { Component } from 'react';
import { View,Text,AsyncStorage } from 'react-native';
import { Icon,Container,Header,Content,Right } from 'native-base';

class Logout extends Component {
    static navigationOptions = {
        title : 'Logout',
    }
    constructor(props){
        super(props);
    }
    componentDidMount(){
        AsyncStorage.clear();
        this.props.navigation.navigate('login');
    }
    render() {
        return (
            <Container>
                <Content>
                    {this.props.navigation.navigate('home')}
                </Content>
            </Container>
        )
    }
}

export default Logout;
