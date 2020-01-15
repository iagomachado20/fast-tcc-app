import React from "react";
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
import {
  Button,
  Text,
  Item,
  Input,
  Label,
  View,
  StyleProvider,
  Toast
} from "native-base";
import variables from "../styles/theme.style";
import getTheme from "native-base/src/theme/components";

import HeaderIntroComponent from "../components/HeaderIntroComponent";

import { UserType } from "../models/auth.model";

// Components
import TipeProfileComponent from "../components/TipeProfileComponent";

const ContainerGradient = styled.ScrollView`
  padding-left: 20;
  padding-right: 20;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100
  },
  viewTop: {
    paddingTop: 30,
    width: "100%",
    paddingBottom: 30
  }
});

const RegisterProfileScreen = props => {
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
                title="Cadastro"
                description="Selecione o tipo de perfil"
              ></HeaderIntroComponent>
              <View style={styles.viewTop}>
                <TipeProfileComponent
                  nav={navigation}
                  data={{
                    type: UserType.Establishment,
                    title: "Estabelecimento",
                    description: "Promova as vagas do seu estabelecimento"
                  }}
                ></TipeProfileComponent>
                <TipeProfileComponent
                  nav={navigation}
                  data={{
                    type: UserType.Client,
                    title: "Cliente",
                    description:
                      "Encontre estabelecimentos com vagas disponíveis"
                  }}
                ></TipeProfileComponent>
              </View>
            </View>
            <LinkInline onPress={() => props.navigation.navigate("Home")}>
              <LinkText>Voltar para Login</LinkText>
            </LinkInline>
          </ContainerGradient>
        </ImageBackground>
      </SafeAreaView>
    </StyleProvider>
  );
};

export default RegisterProfileScreen;
