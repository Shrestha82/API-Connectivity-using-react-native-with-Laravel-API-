import React, { Component } from 'react'
import { Card,Input,Button, Icon } from 'react-native-elements';
import { View,Text,ImageBackground } from 'react-native'; 
import { connect } from 'react-redux';

import { letterUpdate, authRegister } from '../actions';

const input = React.createRef();

class Register extends Component {
    onSubmit(){
        const { email,name,password,user } = this.props;
        this.props.authRegister({name,email,password,user});
        if (this.props.user.status == true) {
             
        }
        this.props.navigation.navigate('login');  
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundStyle} source={require('../Images/wallpaper.jpg')}>
                <View style={{/* marginTop: 100 */ }}>
                <Card 
                    containerStyle={{
                        backgroundColor: 'transparent',borderWidth: 0,shadowColor: 'transparent',}} 
                    title='Signup' titleStyle={{fontSize: 22,color: 'white'}}>
                    <Input 
                        label= 'Name'
                        labelStyle={{color: 'white'}}
                        inputStyle={{color: 'white'}}
                        placeholder = 'Full Name'
                        placeholderTextColor = 'white'
                        inputContainerStyle={{flexDirection: 'row',marginBottom: 10,borderBottomColor: 'white'}}
                        leftIcon={
                            <Icon 
                                name="person"
                                size={18}
                                color= 'white'
                            />
                        }
                        leftIconContainerStyle={{paddingRight: 15}}
                        ref={input}
                        value = {this.props.name}
                        onChangeText = {value =>this.props.letterUpdate({props: 'name',value})}
                    />
                    <Input 
                        label= 'Email'
                        labelStyle={{color: 'white'}}
                        inputStyle={{color: 'white'}}
                        placeholder = 'user@gmail.com'
                        placeholderTextColor = 'white'
                        inputContainerStyle={{flexDirection: 'row',marginBottom: 10,borderBottomColor: 'white'}}
                        leftIcon={
                            <Icon 
                                name="email"
                                size={18}
                                color= 'white'
                            />
                        }
                        leftIconContainerStyle={{paddingRight: 15}}
                        value={this.props.email}
                        onChangeText = {value=>this.props.letterUpdate({props: 'email', value})}
                    />
                    <Input 
                        label= 'Password'
                        labelStyle={{color: 'white'}}
                        inputStyle={{color: 'white'}}
                        placeholder = '**************'
                        placeholderTextColor = 'white'
                        inputContainerStyle={{flexDirection: 'row',marginBottom: 10,borderBottomColor: 'white'}}
                        leftIcon={
                            <Icon 
                                name="lock"
                                size={18}
                                color= 'white'
                            />
                        }
                        secureTextEntry
                        leftIconContainerStyle={{paddingRight: 15}}
                        value={this.props.password}
                        onChangeText = {value=>this.props.letterUpdate({props: 'password',value})}
                    />
                    <Button 
                        title="Submit"
                        buttonStyle={{backgroundColor: 'orange'}}
                        onPress = {this.onSubmit.bind(this)}
                    />
                    <View style={styles.bottomStyle}>
                            <Text style={{paddingTop:2,color:'white'}}>Have an account</Text>
                            <Button 
                                title = 'Login'
                                buttonStyle={{backgroundColor: 'transparent',padding: 0}}
                                titleStyle ={{color: 'skyblue',paddingLeft:5, fontSize: 14}}
                                onPress= {() => this.props.navigation.navigate('login')}
                            />      
                    </View> 
                </Card>
            </View>
        </ImageBackground>    
        )
    }
}

function mapStateToProps(register){
    const { name,email,password,user } = register.register;
    return { name,email,password,user }
}

const styles = {
    backgroundStyle: {
        width: '100%',
        height : '100%',
        flex: 1,
        justifyContent: 'center'
    },
    bottomStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    }
}

export default connect(mapStateToProps,{
    letterUpdate,
    authRegister
})(Register);