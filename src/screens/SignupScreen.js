import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";

const SignupScreen = props => {
  return (
    <View style={styles.container}>
      <Spacer>
        <Text style={styles.text} h3>
          Sign Up For Tracker
        </Text>
      </Spacer>
      <Input labelStyle={styles.label} label="Email" />
      <Spacer />
      <Input labelStyle={styles.label} label="Password" />
      <Spacer>
        <Button style={{ marginTop: 60, ...styles.label }} title="Sign Up" />
      </Spacer>
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "Montserrat"
  },
  text: {
    fontFamily: "Montserrat",
    textAlign: "center",
    marginBottom: 30
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
});
export default SignupScreen;
