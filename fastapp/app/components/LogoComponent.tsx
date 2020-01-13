import React from 'react';

// Styles
import { Image, View } from 'react-native';

const logo = require('../assets/logo.png');

const LogoComponent = (props) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 80, height: 80 }}  source={logo} />
    </View>
);

export default LogoComponent;