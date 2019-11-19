import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../styles/base";
const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Loader;
