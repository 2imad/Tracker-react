import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts, padding, margin } from "../styles/base";
import FormButton from "./formButton";
const FormInput = ({
  buttonTitle,
  holderValue,
  inputValue,
  handleChange,
  submitValue
}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          required
          value={inputValue}
          onChangeText={handleChange}
          placeholder={holderValue}
          placeholderTextColor="rgba(255,255,255,0.8)"
          autoCorrect={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        {inputValue && inputValue.length ? (
          <TouchableOpacity onPress={submitValue}>
            <FormButton title={buttonTitle} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    padding: padding.md,
    marginTop: margin.md
  },
  input: {
    fontFamily: fonts.primary,
    paddingHorizontal: padding.sm - 2,
    marginBottom: padding.sm,
    height: 40,
    color: colors.secondary,
    backgroundColor: "rgba(255,255,255,.2)"
  },
  buttonContainer: {
    paddingVertical: padding.md,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default FormInput;
