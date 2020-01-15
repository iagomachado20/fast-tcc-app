import React from "react";

// Styles
import {
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator
} from "react-native";

import styled from "styled-components";
import {
  LinkFooter,
  LinkInline,
  TextInlineWhite,
  ValidationField,
  LinkText
} from "../styles/style";

import HeaderIntroComponent from "../components/HeaderIntroComponent";

import {
  Button,
  Text,
  Item,
  Input,
  Label,
  View,
  StyleProvider,
  Toast,
  Icon
} from "native-base";
import variables from "../styles/theme.style";
import getTheme from "native-base/src/theme/components";

import { withFormik, ErrorMessage } from "formik";
import * as Yup from "yup";

import API from "../config/enviroments/enviroment";
import { AsyncStorage } from "react-native";

const ContainerGradient = styled.ScrollView`
  padding-left: 20;
  padding-right: 20;
`;

const styles = StyleSheet.create({
  spacing: {
    marginTop: 20
  },
  margin: {
    marginBottom: 15
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100
  }
});

const HomeScreen = props => {
  const bgLoginSrc = require("../assets/images/bg-login.jpg");
  const logo = require("../assets/logo.png");
  const { navigation } = props;

  return (
    <StyleProvider style={getTheme(variables)}>
      <SafeAreaView>
        <ImageBackground
          source={bgLoginSrc}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          <ContainerGradient>
            <View style={styles.container}>

              <HeaderIntroComponent
                title="FastParking"
                description="Encontre vagas para estacionar de onde é que você esteja"
              ></HeaderIntroComponent>
              
              <Item floatingLabel style={styles.margin}>
                <Icon name="mail" />
                <Label>E-mail</Label>
                <Input
                  onChangeText={text => props.setFieldValue("email", text)}
                  value={props.values.email}
                  autoCompleteType="email"
                />
              </Item>
              {props.touched.email && props.errors.email && (
                <ValidationField>{props.errors.email}</ValidationField>
              )}
              <Item floatingLabel style={styles.margin}>
                <Icon name="lock" />
                <Label>Senha</Label>
                <Input
                  value={props.values.password}
                  onChangeText={text => props.setFieldValue("password", text)}
                  secureTextEntry
                />
              </Item>
              {props.touched.password && props.errors.password && (
                <ValidationField>{props.errors.password}</ValidationField>
              )}
              <Button
                disabled={props.isSubmitting}
                onPress={props.handleSubmit}
                rounded
                light
                block
                style={styles.spacing}
              >
                <Text>Entrar </Text>
                {props.isSubmitting && (
                  <ActivityIndicator
                    size="large"
                    color="#87DA6F"
                  ></ActivityIndicator>
                )}
              </Button>
            </View>
            <LinkFooter>
              <TextInlineWhite>Não possui uma conta?</TextInlineWhite>
              <LinkInline
                onPress={() => navigation.navigate("RegisterTypeProfile")}
              >
                <LinkText>Cadastra-se agora</LinkText>
              </LinkInline>
            </LinkFooter>
          </ContainerGradient>
        </ImageBackground>
      </SafeAreaView>
    </StyleProvider>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: "",
    password: ""
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("Preencha o campo de e-mail"),
    password: Yup.string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Preencha o campo de senha")
  }),

  handleSubmit: (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    API.post(`/login`, values)
      .then(response => {
        setSubmitting(false);

        const { token, type, message } = response.data;

        // Save Token in Storage
        AsyncStorage.setItem("token", token);

        Toast.show({
          ...configToast,
          text: message,
          type: type
        });
      })
      .catch(error => {
        const { message, type } = error.response.data;
        setSubmitting(false);

        Toast.show({
          duration: 2000,
          text: message,
          type: type
        });
      });
  }
})(HomeScreen);
