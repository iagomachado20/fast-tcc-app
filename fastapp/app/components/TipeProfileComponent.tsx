import React from "react";

// Styles
import styled from "styled-components";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback
} from "react-native";

// Models
import { UserType } from "../models/auth.model";

const brandEstablishment = require("../assets/icons/car.png");
const brandClient = require("../assets/icons/client.png");

const ButtonOption = styled.TouchableHighlight`
  background-color: "rgb(255,255,255)";
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
  width: 100%;
  margin-bottom: 15;
  border-radius: 5;
`;

const styles = StyleSheet.create({
  icon: {
    margin: 5,
    width: 60,
    height: 60,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "600"
  },
  description: {
    fontSize: 18
  },
  containerText: {
    flex: 1,
    flexWrap: "wrap"
  }
});

const TipeProfileComponent = props => {
  const icon =
    props.data.type === UserType.Establishment
      ? brandEstablishment
      : brandClient;
  const { data, nav } = props;

  function setTypeUser() {
    nav.navigate("RegisterProfile", { userType: props.data.type });
  };

  return (
    <ButtonOption onPress={() => setTypeUser()}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image style={styles.icon} source={icon} />
        <View style={styles.containerText}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      </View>
    </ButtonOption>
  );
};

export default TipeProfileComponent;
