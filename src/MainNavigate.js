import React,{Component} from 'react';
import { View,Text} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {  createDrawerNavigator,DrawerItems } from 'react-navigation-drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon,Container,Header,Body,Content } from 'native-base';
import { connect } from 'react-redux';

import { LoginAction } from './actions';

import Login from './screen/Login';
import Register from './screen/Register';
import Home from './screen/Home';
import Profile from './screen/Profile';
import Settings from './screen/Settings';
import About from './screen/About';
import Details from './screen/Details';
import Logout from './screen/Logout';

const customNavigator = (props)=>{
    
    return (
        <Container>
            <Header style={{ height: 50,backgroundColor: 'rgb(200, 199, 199)',alignItems:'center', }}>
                <Body>
                    <Text style={{color: "black",}}>APICALL</Text>
                </Body>
            </Header>
            <Content>
                <DrawerItems {...props} />
            </Content>
        </Container>
    );
}

const MainNavigate = createBottomTabNavigator({
    login : Login,
    register: Register,
    main:createBottomTabNavigator({
        home: createStackNavigator({
            home: {screen : Home}
        },{
            navigationOptions:{
                title: 'Home',
                tabBarIcon: ({tintColor})=>{
                    return <MaterialCommunityIcons name="home" size={30} color={tintColor} />
                } 
            }
        }),
        profile: createStackNavigator({
            profile: { screen: Profile},
            Details: createDrawerNavigator({
                details: { screen: Details,},
                setting: { screen: Settings},
                about: { screen: About,
                    navigationOptions:{
                        drawerIcon: ({tintColor})=><Ionicons name="md-information-circle" size={24} color={tintColor} />
                    }  
                },
                logout: { screen: Logout,
                    navigationOptions:{
                        drawerIcon : ({tintColor})=><Ionicons name="md-log-out" size={24} color={tintColor} />
                    }
                    // contentComponentStyle = { flex: 1,flexDirection: 'column',justifyContent: 'space-between', },
                },
            },
            {
                initialRouteName: 'details',
                contentComponent: customNavigator,
                drawerPosition: "right",
                drawerWidth: 300,
                drawerOpenRoute: 'DrawerOpen',
                drawerCloseRoute: 'DrawerClose',
                drawerToggleRoute: 'DrawerToggle',
            })
        },{
            navigationOptions:{
                tabBarIcon: ({tintColor})=>{
                    return <MaterialCommunityIcons name="human" size={30} color={tintColor} />
                }
            }
        })
    },
    {
        navigationOptions:{
            tabBarOptions:{
                labelStyle: {fontSize: 12}
            }
        }
    }    
    )
},
{
    defaultNavigationOptions: ()=>{
        return{
            tabBarVisible: false
        }
    }
})

/* function mapStateToProps(login){
    const { user } = login.login;
    return { user };
} */

export default createAppContainer(MainNavigate);