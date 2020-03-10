import React from "react";
import { Text, StyleSheet } from "react-native";
import { fonts, colors, padding } from "../styles/base";

const BottomTitle = ({ children, isFocused }) => {
  const color = isFocused ? colors.orangeRed : colors.secondary;
  return <Text style={{ color, ...styles.txtStyle }}> {children} </Text>;
};

const styles = StyleSheet.create({
  txtStyle: {
    fontFamily: fonts.primary,
    padding: padding.sm - 5,
    textAlign: "center"
  }
});

export default BottomTitle;
