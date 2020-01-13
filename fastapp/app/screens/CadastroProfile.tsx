import React, { useState } from 'react';
import { Image, Button, ImageBackground, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { Title, LinkFooter, LinkInline, TextInlineWhite, ValidationField, LinkText, Avatar } from '../styles/style';
import { Text, Item, Input, Label, View, StyleProvider, Toast, Icon, Button as ButtonBase } from 'native-base';
import variables from '../styles/theme.style';
import getTheme from 'native-base/src/theme/components';
import { UserType } from '../models/auth.model';

import { withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import API from '../config/enviroments/enviroment';
import { AsyncStorage } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const ContainerGradient = styled.ScrollView`
    padding-left: 20;
    padding-right: 20;
`;

const styles = StyleSheet.create({
    spacing: {
        marginTop: 20
    },
    margin: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    boxView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadAvatar: {
        width: 100,
        height: 100,
        borderRadius: 30,
    }
});

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    }
}


const CadastroProfileScreen = (props) => {

    getPermissionAsync();

    const bgLoginSrc = require('../assets/images/bg-login.jpg');
    const logo = require('../assets/logo.png');
    const userType = props.navigation.getParam('userType');

    const [picture, setPicture] = useState(null);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          base64: true,
          quality: 1
        });
    
        if (!result.cancelled) {
            props.setFieldValue('foto', result.base64);
            setPicture(result.uri);
        }
    };

    return (
        <StyleProvider style={getTheme(variables)}>
            <SafeAreaView>
                <ImageBackground
                    source={bgLoginSrc}
                    resizeMode='cover'
                    style={{ width: '100%', height: '100%' }}>
                    <ContainerGradient>
                        <View style={ styles.container }>

                            <Image style={{ width: 80, height: 80 }}  source={logo} />
                            <Title>Cadastro</Title>
                            
                            
                            { picture && <Avatar source={{ uri: picture }}/> }

                            <ButtonBase iconLeft
                                bordered
                                success
                                style={ { marginTop: 10 } }  
                                onPress={pickImage}>
                                <Icon name='camera' />   
                                <Text>Selecionar Foto</Text>
                            </ButtonBase>

                            <Item floatingLabel style={ styles.margin }>
                                <Icon name='person'/>
                                <Label>Nome</Label>
                                <Input
                                    onChangeText={text => props.setFieldValue('nome', text)}
                                    value={ props.values.nome } 
                                    textContentType='username' />
                            </Item>
                            <Item floatingLabel style={ styles.margin }>
                                <Icon name='mail'/>
                                <Label>E-mail</Label>
                                <Input
                                    onChangeText={text => props.setFieldValue('email', text)}
                                    value={ props.values.email } 
                                    textContentType='emailAddress' />
                            </Item>
                            
                            { props.touched.email 
                                && props.errors.email 
                                && <ValidationField>{props.errors.email}</ValidationField> 
                            }
                            <Item floatingLabel style={ styles.margin }>
                                <Icon name='call'/>
                                <Label>Telefone</Label>
                                <Input
                                    onChangeText={text => props.setFieldValue('telefone', text)}
                                    value={ props.values.telefone } 
                                    textContentType='telephoneNumber' />
                            </Item>
                            {
                                userType === UserType.Establishment &&
                                <View style= { styles.boxView }>
                                    <Item floatingLabel style={ styles.margin }>
                                        <Icon name='cash'/>
                                        <Label>Valor/Hora</Label>
                                        <Input
                                            onChangeText={text => props.setFieldValue('valorhora', text)}
                                            value={ props.values.valorhora } />
                                    </Item>
                                    <Item floatingLabel style={ styles.margin }>
                                        <Icon name='clock'/>
                                        <Label>Horário de Funcionamento</Label>
                                        <Input
                                            onChangeText={text => props.setFieldValue('horarioFuncionamento', text)}
                                            value={ props.values.horarioFuncionamento }  />
                                    </Item>
                                    {/* <Item floatingLabel style={ styles.margin }>
                                        <Icon name='pin'/>
                                        <Label>Endereço</Label>
                                        <Input
                                            onChangeText={text => props.setFieldValue('localizacao', text)}
                                            value={ props.values.localizacao }/>
                                    </Item> */}
                                    <Item floatingLabel style={ styles.margin }>
                                        <Icon name='home'/>
                                        <Label>Número</Label>
                                        <Input
                                            onChangeText={text => props.setFieldValue('numeroEndereco', text)}
                                            value={ props.values.numeroEndereco }/>
                                    </Item>
                                </View>
                            }
                            
                            { userType === UserType.Client && 
                                <View style= { styles.boxView }>
                                    <Item floatingLabel style={ styles.margin }>
                                        <Icon name='document'/>
                                        <Label>Placa do Veículo</Label>
                                        <Input
                                        onChangeText={text => props.setFieldValue('placaVeiculo', text)}
                                        value={ props.values.placaVeiculo }  />
                                    </Item>
                                    <Item floatingLabel style={ styles.margin }>
                                        <Icon name='car'/>
                                        <Label>Marca do Veículo</Label>
                                        <Input
                                        onChangeText={text => props.setFieldValue('marcaVeiculo', text)}
                                        value={ props.values.marcaVeiculo }  />
                                    </Item>
                                </View>     
                            }

                            
                            
                            <Item floatingLabel style={ styles.margin }>
                                <Icon name='lock'/>
                                <Label>Senha</Label>
                                <Input
                                    value={props.values.password} 
                                    onChangeText={text => props.setFieldValue('password', text)}
                                    secureTextEntry />
                            </Item>
                            <ButtonBase
                                disabled={ props.isSubmitting }
                                onPress={ props.handleSubmit }
                                rounded light block style={ styles.spacing }>
                                <Text>Criar Conta </Text>
                                { props.isSubmitting &&
                                  <ActivityIndicator size="large" color="#87DA6F"></ActivityIndicator>
                                }
                            </ButtonBase>
                        </View>
                        <LinkFooter>
                            <LinkInline
                                onPress={() => props.navigation.navigate('Home')}>
                                <LinkText>Voltar para Login</LinkText>     
                            </LinkInline>
                        </LinkFooter>
                    </ContainerGradient>
                </ImageBackground>
            </SafeAreaView>
        </StyleProvider>

    )

};

export default withFormik({

    mapPropsToValues: () => ({
        email: '',
        password: '',
        telefone: '',
        nome: '',
        placaVeiculo: '',
        marcaVeiculo: '',
        horarioFuncionamento: '',
        numeroEndereco: '',
        localizacao: null,
        valorhora: '0',
        foto: null
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('Preencha o campo de e-mail'),
        password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .required('Preencha o campo de senha'),
    }),

    handleSubmit: (values, { setSubmitting, setErrors }) => {

        setSubmitting(true);

        const configToast = {
            duration: 2000
        }
        
        API.post(`/register`, values)
        .then(response => {

            setSubmitting(false);

            const { type, message } = response.data;

            Toast.show({
                ...configToast,
                text: message,
                type: type
            });

        }).catch(error => {

            const { message, type } = error.response.data;
            setSubmitting(false);

            Toast.show({
                ...configToast,
                text: message,
                type: type
            });

        }); 

    }

})(CadastroProfileScreen);