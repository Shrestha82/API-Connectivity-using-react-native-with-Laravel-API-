import React, { Component } from 'react';
import { View, Text,Image,TouchableWithoutFeedback,ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon,Container,Header,Content,Right } from 'native-base';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { LoginAction } from '../actions';

class Settings extends Component {
    constructor(props){
        super(props);
        this.state = { filePath: {} };
    }

    static navigationOptions = {  
        title : 'Settings',
        drawerIcon: ({tintColor})=> <Ionicons name="md-settings" size={24} color={tintColor} />
    }

    onPress(){
        
    }

    render() {
        return (
            <Container>
                {/* <Header>
                    <Right>
                        <Icon name="ios-menu" onPress={()=>
                            this.props.navigation.navigate('DrawerOpen')
                        } />
                    </Right>
                </Header> */}
                <Content contentContainerStyle={{
                    flex: 1,
                    backgroundColor: 'skyblue',
                }}>
                    <View style={{margin: 10,}}>
                        <Image 
                            style={styles.imageStyle}
                            source={require("../Images/unknown.png")}
                        />
                        <TouchableWithoutFeedback onPress={()=>{this.onPress()}}>
                            <Text style={styles.textStyle}>Change Profile Picture</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={{margin: 5,flex: 1}}>
                        <Input 
                            label="Name"
                            labelStyle={{color: 'white'}}
                            inputStyle={{color: 'white'}}
                            inputContainerStyle={{borderBottomColor: 'white'}}
                            value={this.props.user.user.name}
                        />
                        <Input 
                            label="Email"
                            labelStyle={{color: 'white',marginTop: 15}}
                            inputStyle={{color: 'white'}}
                            inputContainerStyle={{borderBottomColor: 'white'}}
                            value={this.props.user.user.email}
                        />
                        <Input 
                            label="Username"
                            labelStyle={{color: 'white',marginTop: 15}}
                            inputStyle={{color: 'white'}}
                            inputContainerStyle={{borderBottomColor: 'white'}}
                            value={this.props.user.user.username}
                        />
                        <Input 
                            label="Phone number"
                            labelStyle={{color: 'white',marginTop: 15}}
                            inputStyle={{color: 'white'}}
                            inputContainerStyle={{borderBottomColor: 'white'}}
                            value={this.props.user.user.phone}
                        />
                        <Input 
                            label="Gender"
                            labelStyle={{color: 'white',marginTop: 15}}
                            inputStyle={{color: 'white'}}
                            inputContainerStyle={{borderBottomColor: 'white'}}
                            value={this.props.user.user.gender}
                        />
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

const styles = {
    textStyle:{
        fontSize: 16,
        color: 'white',
        margin: 5,
    },
    imageStyle:{
        width: 150,
        height: 150,
        borderRadius: 75,
        
    }
}

function mapStateToProps(login){
    const { user } = login.login;
    return { user };
}

export default connect(mapStateToProps,{LoginAction}) (Settings);