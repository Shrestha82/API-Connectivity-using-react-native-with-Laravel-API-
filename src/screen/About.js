import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Icon,Container,Header,Content,Right } from 'native-base';

class About extends Component {
    static navigationOptions = {
        title: 'About',
        
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
                    justifyContent : 'center',
                    alignItems: 'center',
                    // backgroundColor: 'skyblue',
                }}>
                    <Text style={styles.textStyle}>About...</Text>
                </Content>
            </Container>
        )
    }
}

const styles = {
    textStyle:{
        fontSize: 20,
        color: 'black',
        fontStyle: 'italic'
    }
}


export default About;