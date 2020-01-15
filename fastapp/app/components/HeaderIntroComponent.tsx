import React from 'react';
import LogoComponent from './LogoComponent';

import { 
    Title, 
    Description 
} from '../styles/style';

// Styles
import { View } from 'react-native';

const HeaderIntroComponent = (props: { title: string, description: string }) => {
    return (
        <View styles={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
            <LogoComponent></LogoComponent>
            <Title>{ props.title}</Title>
            { props.description && 
                <Description>{ props.description}</Description> }
        </View>
    );
};
    

export default HeaderIntroComponent;