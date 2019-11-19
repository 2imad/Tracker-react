import React, { useContext } from "react";
import { Context as ProfileContext } from "../context/ProfileContext";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { colors, fonts, padding, margin } from "../styles/base";
import FormInput from "../components/FormInput";
import useSaveProfile from "../hooks/useSaveProfile";
const ProfileNameScreen = () => {
  const {
    state: { name },
    changeProfileName
  } = useContext(ProfileContext);
  const [saveProfile] = useSaveProfile();
  const submit = () => {
    changeProfileName();
    saveProfile();
  };
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={styles.inner}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}> Add my profile name </Text>
        </View>
        <FormInput
          buttonTitle="SAVE"
          holderValue="Profile name"
          inputValue={name}
          handleChange={changeProfileName}
          submitValue={submit}
        />
      </View>
    </SafeAreaView>
  );
};

ProfileNameScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: colors.primaryBgColor
  },
  title: {
    padding: padding.lg,
    fontFamily: fonts.primary,
    color: colors.primary,
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.8
  }
});
export default ProfileNameScreen;
