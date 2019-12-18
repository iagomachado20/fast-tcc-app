import React from 'react';
import { Image, ImageBackground } from 'react-native';
import styled from 'styled-components';
import { Title, Description } from '../styles/style';
import { Button, Text, Item, Input, Icon  } from 'native-base';

const ContainerGradient = styled.View`
    flex: 1;
    align-items: center;
    padding-left: 20;
    padding-right: 20;
    justify-content: center;
`;



export class HomeScreen extends React.Component<any, any> {

    fieldRef = React.createRef();

    static navigationOptions = {
        header: null
    };

    render() {

        const { navigate } = this.props.navigation;
        const bgLoginSrc = require('../assets/images/bg-login.jpg');

        return (
            
            <ImageBackground 
                source={ bgLoginSrc }
                resizeMode='cover'
                style={{width: '100%', height: '100%'}}>
                <ContainerGradient>
                    <Image  
                        style={{width: 100, height: 100}} 
                        source={require('../assets/logo.png')} />
                    <Title>FastParking</Title>
                    <Description>Encontre vagas para estacionar de onde é que você esteja.</Description>
                    <Item inlineLabel>
                        <Icon active name='email' />
                        <Input placeholder='E-mail'/>
                    </Item>
                    <Button rounded light block>
                        <Text>Entrar</Text>
                    </Button>
                </ContainerGradient>
            </ImageBackground>

        );
    }
}
