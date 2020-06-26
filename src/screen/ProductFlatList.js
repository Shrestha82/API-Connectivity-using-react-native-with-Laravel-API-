import React,{Component} from 'react';
import { View,Text,ActivityIndicator, Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { ListItem,List,Card,Button,Image } from 'react-native-elements';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ProductFlatList extends Component{
    constructor(props){
        super(props);
        this.state = {isModalVisible: false,}
    }

    closeModal = () =>{this.setState({isModalVisible:false})}

    renderDetails = ()=>{
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render(){
        const { pname,img,fulldes,price } =this.props.item;
       return(
        <View style={{ }}>
            <Card>
                <Image 
                    source={{uri: `https://apicall01.000webhostapp.com/uploadImages/${img}`}}
                    style={{ flex: 1, height: 200, marginBottom: 10 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text style={{fontSize: 18}}>{pname}</Text>
                <Text>Color: {this.props.item.shortdes}</Text>
                <Button title='Details' 
                    buttonStyle={{marginTop: 10}}
                    onPress= {()=>{this.renderDetails()}}
                />
            </Card>
            <Modal isVisible={this.state.isModalVisible} 
                    backdropOpacity= {.9} backdropColor={"black"}
                    scrollHorizontal= {true}
                     /* onBackdropPress={()=>this.closeModal()} 
                    onSwipeComplete={()=>this.closeModal()}  */
                    // style={{maxHeight: Dimensions.get('window').height/2,marginTop:20}}        
            >
                <TouchableWithoutFeedback onPress= {()=>{this.closeModal()}}>
                    <Ionicons 
                        style={{
                            position: 'absolute',
                            right: 5,
                            top: 5,
                      }} 
                    name="md-close" size={24} color={'white'} />
                </TouchableWithoutFeedback>
                <View style={{}}>
                    <Text style={styles.headerStyles}>Product Details</Text>
                    <View>
                        <Image 
                            source={{uri: `https://apicall01.000webhostapp.com/uploadImages/${img}`}}
                            style={styles.ImageStyle}
                        />
                        <Text style={styles.pDetials}>Product Name :&nbsp;&nbsp; 
                            <Text style={styles.pDes}>{pname}</Text>
                        </Text>
                        <Text style={styles.pDetials}>Color :&nbsp;&nbsp; 
                            <Text style={styles.pDes}>{this.props.item.shortdes}</Text>
                        </Text>
                        <Text style={styles.pDetials}>Full Description :&nbsp;&nbsp; 
                            <Text style={styles.pDes}>{fulldes}</Text>
                        </Text>
                        <Text style={styles.pDetials}>Price :&nbsp;&nbsp; 
                            <Text style={styles.pDes}>{price}</Text>
                        </Text>
                    </View>
                    <View style={{marginTop: 15,}}>
                        <View>
                            <Button 
                                title="Add to Card!"
                                buttonStyle={{backgroundColor: 'orange'}}
                            />
                        </View>
                        <View style={{marginTop: 10,}}>
                            <Button 
                                title="Buy Now!"
                                buttonStyle={{backgroundColor: 'green'}}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
       )
    }
}

const styles ={
    headerStyles:{
        color: 'white',
        textAlign: 'center',
        marginBottom:10,
        fontSize: 22,
    },
    ImageStyle:{
        height:300,
        width: '100%',
        marginBottom: 20
    },
    pDetials:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    pDes:{
        fontWeight: '100',
        marginLeft: 30,
    }
}

export default ProductFlatList;