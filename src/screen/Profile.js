import React, { Component } from 'react';
import { View,Text,TouchableWithoutFeedback,Image ,RefreshControl,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { Button,Input } from 'react-native-elements';
import { DrawerActions } from 'react-navigation-drawer';
import Modal from 'react-native-modal';
import { Icon,Container,Header,Content,Right } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { LoginAction,editLatterUpdate,authEdit } from '../actions';
import axios from 'axios';

export const USER_KEY = 'auth-demo-key';
// export const onLogOut = () => AsyncStorage.removeItem(USER_KEY);

export class Profile extends Component {
    constructor(props){
        super(props);
        this.state = { isModalVisible: false, image: null,
            refreshing: false,userData:[]
        };
    }

    static navigationOptions = ({ navigation })=> {
        // const { navigate } = navigation;
        return{
            title: 'Profile',
            headerStyle: {backgroundColor: 'red'},
            headerTitleStyle:{color: 'white'},
            tabBarIcon: ({tintColor})=>{
                return <MaterialCommunityIcons 
                name="human"
                size={30} 
                color={tintColor}  
                />
            },
            headerRight:()=>{
                return <Button 
                    onPress={ ()=>{
                        navigation.dispatch(DrawerActions.openDrawer());
                        navigation.navigate('details');
                    } }
                    icon={{name: 'menu', size:28,color:'white'}}
                    buttonStyle={{ backgroundColor: 'red' }}
                />
            },
        }
    }

    closeModal = () =>{this.setState({isModalVisible:false})}

    editDtials(){
           /*  <ActivityIndicator size= "large" />
        this.props.navigation.navigate('setting'); */
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

/*     componentDidMount() {
        this.getPermissionAsync();
      }
    
      getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }; */

      _pickImage = async () =>{
          try {
              let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes : ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect : [4, 3],
                  quality: 1
              });
              if(!result.cancelled){
                  this.setState({image: result.uri });
              }
              console.log(result);
          } catch (E) {
              console.log(E);
          }
      }

      editProfilePic(){
        let { image } = this.state; 
          if(image){
              return(
                <Image 
                  style={styles.imageStyle}
                  source= {{ uri: image }}
                />    
              );
          }else{
              if(this.props.user.user.img != null){
                  return(
                    <Image 
                      style={styles.imageStyle}
                      source={{uri : `https://apicall01.000webhostapp.com/userImages/${this.props.user.user.img}`}}
                    />
                  );
              }else{
                console.log(this.props.user.user.img);
                return(
                    <Image 
                        style={styles.imageStyle}
                        source={require("../Images/unknown.png")}
                    />
                );
              }
          }
      }

      profilePic(){
        if(this.props.user.user.img != null){
            return(
              <Image 
                style={styles.imageStyle}
                source={{uri : `https://apicall01.000webhostapp.com/userImages/${this.props.user.user.img}`}}
              />
            );
        }else{
          console.log(this.props.user.user.img);
          return(
              <Image 
                  style={styles.imageStyle}
                  source={require("../Images/unknown.png")}
              />
          );
        }
      }

      renderUpdate(){
          const {id} = this.props.user.user;
          const p_name = this.props.user.user.name; 
          const {p_email} = this.props.user.user.email;
          const {name,email,username,phone,gender} = this.props;
          if(email != p_email){
            this.setState({email: p_email});
            console.log(email);
            this.props.authEdit({name,email,username,phone,gender,id});
          }
          if(this.props.updateData.message){
            this.closeModal();
          }
        Alert.alert('Updation is Done!');
      }

      otherDetails(){
          const {username,phone,gender} = this.props.user.user;
          if(!username){
              console.log('no username');
          }else{
              return(
                <Text style={styles.textStyle}>{username}</Text>
              )
          }
          if(!phone){
            console.log('no phone number');
        }else{
            return(
              <Text style={styles.textStyle}>{phone}</Text>
            )
        }
      }

      refreshUserRecord = async()=> {
          const res = await axios.get(
              `https://apicall01.000webhostapp.com/api/update/${this.props.user.user.id}`)
              .then(res =>{
                    const user = res.data;
                    console.log(user)
                    this.setState({userData: user})}   
                )
              .catch(error => console.log(error));
      }

      componentDidMount(){
          this.refreshUserRecord();
      }

     _onRefresh(){
         this.setState({refreshing: true});
         this.refreshUserRecord().then(()=>{
             this.setState({refreshing: false});
         })
     } 

    render() {
        return (
            <View style={styles.viewStyle}>
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing = {this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={styles.header}>
                        {this.profilePic()}
                        {/* {this.state.user.map((uData,index) =>
                            <Text>
                             <Text key={index} style={styles.textStyle}>{uData.user.name}</Text>
                             <Text key={index} style={styles.textStyle1}>{uData.user.email}</Text>
                            </Text>
                            )} */}
                        <Text style={styles.textStyle}>{this.props.user.user.name}</Text>
                        <Text style={styles.textStyle1}>{this.props.user.user.email}</Text>
                        {this.otherDetails()}
                    </View>    
                    <View style={{ marginTop: 15 }}>
                        <Button 
                            title = "Edit Profile"
                            buttonStyle={styles.buttonStyle}
                            onPress= {()=>{this.editDtials()}}
                        />    
                    </View>
                </ScrollView>  
                <Modal isVisible={this.state.isModalVisible} 
                    backdropOpacity= {1} backdropColor= {"skyblue"}
                    /* animationIn="slideInUp" animationOut="slideOutDown"
                     onBackdropPress={()=>this.closeModal()} 
                    onSwipeComplete={()=>this.closeModal()} swipeDirection="right" */
                    //    style={{maxHeight: Dimensions.get('window').height / 2}} 
                    >
                    <View style={styles.topStyles}>
                        <TouchableWithoutFeedback onPress={()=>{this.closeModal()}}>
                            <Ionicons name="md-close" size={26} color={'white'} />       
                        </TouchableWithoutFeedback> 
                        <Text style={{fontSize: 22,color: 'white',}}>Update Profile</Text>
                        <TouchableWithoutFeedback onPress={()=>{this.renderUpdate()}}>
                            <Ionicons name="md-checkmark" size={26} color={'white'} />       
                        </TouchableWithoutFeedback> 
                    </View> 
                        <View style={{margin: 10,}}>
                            {this.editProfilePic()}
                            <TouchableWithoutFeedback onPress={this._pickImage}>
                                <Text style={styles.textStyle}>Change Profile Picture</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <ScrollView style={{margin: 5,}}>
                            <Input 
                                label="Name"
                                labelStyle={{color: 'white'}}
                                inputStyle={{color: 'white'}}
                                inputContainerStyle={{borderBottomColor: 'white'}}
                                value={this.props.user.user.name}
                                onChangeText={value=>this.props.editLatterUpdate({props:'name',value})}
                            />
                            <Input 
                                label="Email"
                                labelStyle={{color: 'white',marginTop: 15}}
                                inputStyle={{color: 'white'}}
                                inputContainerStyle={{borderBottomColor: 'white'}}
                                value={this.props.user.user.email}
                                onChangeText={value=>this.props.editLatterUpdate({props:'email',value})}
                            />
                            <Input 
                                label="Username"
                                labelStyle={{color: 'white',marginTop: 15}}
                                inputStyle={{color: 'white'}}
                                inputContainerStyle={{borderBottomColor: 'white'}}
                                value={this.props.user.user.username}
                                onChangeText={value=>this.props.editLatterUpdate({props: 'username',value})}
                            />
                            <Input 
                                label="Phone number"
                                labelStyle={{color: 'white',marginTop: 15}}
                                inputStyle={{color: 'white'}}
                                inputContainerStyle={{borderBottomColor: 'white'}}
                                value={this.props.user.user.phone}
                                onChangeText={value=>this.props.editLatterUpdate({props: 'phone',value})}
                            />
                            <Input 
                                label="Gender"
                                labelStyle={{color: 'white',marginTop: 15}}
                                inputStyle={{color: 'white'}}
                                inputContainerStyle={{borderBottomColor: 'white'}}
                                value={this.props.user.user.gender}
                                onChangeText={value=>this.props.editLatterUpdate({props: 'gender',value})}
                            />
                        </ScrollView>
                </Modal>
            </View>
        )
    }
}

const styles = {
    topStyles:{
        /* borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderRadius: 10, */
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    header:{
        alignItems: 'center',
        marginTop: 10,
    },
    imageStyle:{
        borderRadius: 75,
        width: 150,
        height: 150,
        // margin: 10,
    },
    viewStyle:{
        flex: 1,
        // justifyContent : 'center',
        // alignItems: 'center',
        backgroundColor: 'rgb(34, 34, 34)',
    },
    textStyle:{
        fontSize: 16,
        color: 'white',
        margin: 5,
        // fontStyle: 'italic'
    },
    textStyle1:{
        fontSize: 16,
        fontWeight: '200',
        color: 'white',
        // fontStyle: 'italic'
    },
    textStyle2:{
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    buttonStyle:{
        marginLeft: 20,
        marginRight: 20,
    }
}

function mapStateToProps(login){
    const { user } = login.login;
    const { name,email,username,phone,gender,img,updateData } = login.edit;
    return {user,name,email,username,phone,gender,img,updateData};
}

export default connect(mapStateToProps,{
    LoginAction,
    editLatterUpdate,
    authEdit})(Profile);
