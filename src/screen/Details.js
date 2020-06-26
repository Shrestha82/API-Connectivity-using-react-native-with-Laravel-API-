import React, { Component } from 'react';
import { View,Text,Image } from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon,Container,Header,Content,Right } from 'native-base';

import { LoginAction } from '../actions';

// const { name,email,phone } = this.props.user.user; 


class Details extends Component {
    static navigationOptions = ( {navigation})=> ({
        title: "Details",
        headerStyle:{ backgroundColor: 'red'},
        headerTitleStyle:{ color: 'white'},
        drawerIcon: ({tintColor})=> <Ionicons name="md-home" size={24} color={tintColor} />
    });
    render() {
        console.log(this.props.user);
        
        return (
            <Container>
                {/* <Header>
                    <Right>
                        <Icon name="ios-menu" onpress={()=>
                            this.props.navigation.navigate('DrawerOpen')
                        } />
                    </Right>
                </Header> */}
                <Content contentContainerStyle={{
                    flex: 1,
                    backgroundColor: 'rgb(34, 34, 34)',
                }}>
                    <Text style={styles.textStyle}>Details</Text>     
                    <View style={styles.footer}>
                        <Text style={styles.textStyle2}>Please Swipe Right for more Options..</Text>
                    </View> 
                </Content>
            </Container>

            // <View style={styles.viewStyle}>
            //     <Text style={styles.textStyle}>Details</Text>     
            //     <View style={styles.footer}>
            //         <Text style={styles.textStyle2}>Please Swipe Right for more Options..</Text>
            //     </View>           
            // </View>
        )
    }
}

const styles = {
    /* viewStyle:{
        flex: 1,
        // justifyContent : 'center',
        // alignItems: 'center',
        backgroundColor: 'rgb(34, 34, 34)',
    }, */
    textStyle:{
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        // fontStyle: 'italic'
    },
    footer:{
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        left: 75,
    },
    textStyle2:{
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        fontStyle: 'italic',
        textAlign: 'center',
    },
}

function mapStateToProps(login){
    const { user } = login.login;
    return {user};
}

export default connect(mapStateToProps,{LoginAction})(Details);
