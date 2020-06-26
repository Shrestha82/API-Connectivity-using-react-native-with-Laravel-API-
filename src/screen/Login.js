import React, { Component } from 'react'
import { View,Text,ActivityIndicator,ImageBackground } from 'react-native'; 
import { Card,Input,Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { loginLetterUpdate,authLogin } from '../actions';

class Login extends Component {
    constructor(props){
        super(props);
    }

    renderError(){
        if(this.props.error){
            return(
                <Text style={styles.errorStyle}>{this.props.error}</Text>
            )
        }
    }

    onLogin(){
        const { email,password } = this.props;
        this.props.authLogin({email,password},()=>{
            if(this.props.user.status === true){
                this.props.navigation.navigate('main');
                console.log(this.props.user);
            }else{
                this.props.navigation.navigate('login');
                alert('Something gonna wrong');
            }            
        });
        // this.props.navigation.navigate('main');
    }

    renderLoginButton(){
        if(this.props.loader == true){
            return(
                /* <Button 
                    title="Login"
                    buttonStyle={{backgroundColor: '#009688'}}
                    onPress = {this.onLogin.bind(this)}
                /> */
                <ActivityIndicator size= 'large'/>
                /* <View style={{backgroundColor: 'black'}}>
                    <Text style={{color: 'white'}}>Loading...</Text>
                </View> */
            )
        }else{
            return(
                <Button 
                    title="Login"
                    buttonStyle={{backgroundColor: 'orange'}}
                    onPress = {this.onLogin.bind(this)}
                />
            )
        }        
    }

    render() {
        return (
               <ImageBackground style={styles.backgroundStyle} source={require('../Images/wallpaper.jpg')}>
                   <View style={{/* marginTop: 100 */}}>
                    <Card containerStyle={{
                        backgroundColor: 'transparent',borderWidth: 0,shadowColor: 'transparent',}} 
                        title='Login' titleStyle={{fontSize: 22,color: 'white'}}>
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
                            onChangeText={value=>this.props.loginLetterUpdate({props: 'email',value})}
                        />
                        <Input 
                            label= 'Password'
                            labelStyle={{color: 'white'}}
                            inputStyle={{color: 'white'}}
                            placeholder = '**************'
                            placeholderTextColor = 'white'
                            secureTextEntry
                            inputContainerStyle={{flexDirection: 'row',marginBottom: 10,borderBottomColor: 'white'}}
                            leftIcon={
                                <Icon 
                                    name="lock"
                                    size={18}
                                    color= 'white'
                                />
                            }
                            leftIconContainerStyle={{paddingRight: 15}}
                            value={this.props.password}
                            onChangeText={value=>this.props.loginLetterUpdate({props: 'password',value})}
                        />
                            {this.renderError()}
                            {this.renderLoginButton()}
                    
                        <View style={styles.bottomStyle}>
                            <Text style={{paddingTop:2,color:'white'}}>If you new member please</Text>
                            <Button 
                                title = 'Register'
                                buttonStyle={{backgroundColor: 'transparent',padding: 0}}
                                titleStyle ={{color: 'skyblue',paddingLeft:5, fontSize: 14}}
                                onPress= {() => this.props.navigation.navigate('register')}
                            />   
                        </View>   
                    </Card>
                    </View>
               </ImageBackground>
            
        )
    }
}

function mapStateToProps(login){
    const { email, password, user,loader,error } = login.login;
    // const {user} = userData.login
    return { 
        email,
        password,
        user,//retrive data detials from the backend
        loader,
        error       
    }

}

const styles ={
    backgroundStyle: {
        width: '100%',
        height : '100%',
        flex: 1,
        justifyContent: 'center'
    },
    errorStyle:{
        color: 'red',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 18,
        paddingBottom: 5,
    },
    bottomStyle:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    }
}

export default connect(mapStateToProps,{
    loginLetterUpdate,
    authLogin
})(Login);