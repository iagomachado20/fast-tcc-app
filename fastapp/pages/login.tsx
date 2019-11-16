import React from 'react';
import { Text, ImageBackground } from 'react-native';
import styled from 'styled-components';

const ContainerGradient = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export class HomeScreen extends React.Component<any, any> {

    static navigationOptions = {
        header: null
    };

    render() {

        const { navigate } = this.props.navigation;
        const bgLoginSrc = require('../assets/images/bg-login.jpg');

        return (
            <ImageBackground 
                source={bgLoginSrc}
                resizeMode='cover'
                style={{width: '100%', height: '100%'}}>
                <ContainerGradient>
                    <Text>FastParking</Text>
                </ContainerGradient>
            </ImageBackground>
        );
    }
}
