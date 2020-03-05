import React, { useContext, useState } from "react";
import { fonts, padding, margin, colors } from "../styles/base";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ProfileContext } from "../context/ProfileContext";
import {
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { NavigationEvents } from "react-navigation";
import BottomTitle from "../components/BottomTitle";
import { Button, Avatar } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import ScrollViewItem from "../components/ScrollViewItem";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const {
    state: { image },
    addProfilePhoto,
    getProfilePhoto
  } = useContext(ProfileContext);

  const pickImage = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("We need access to your camera roll");
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        const { uri } = result;
        addProfilePhoto(uri);
      }
    }
  };
  return (
    <View style={styles.outer}>
      <NavigationEvents onWillFocus={getProfilePhoto} />
      <View style={styles.upper}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>My settings </Text>
        </View>
        <View style={styles.avatarContainerOuter}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Avatar
                source={{
                  uri: image || null
                }}
                size={80}
                rounded
                title="TR"
                showEditButton
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.latter}>
        <ScrollView>
          <ScrollViewItem
            bodyItems={[
              "Do you like the App? Tell us",
              "A problem ? contact us "
            ]}
            header="Share my experience"
            last="Share"
          />
          <ScrollViewItem
            bodyItems={["Manage my data", "Save my data"]}
            header="My account"
            last={null}
          />
          <ScrollViewItem
            bodyItems={["Terms of Service", "Privacy Policy", "Personal data"]}
            header="Legal"
            last={null}
          />
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={signout}>
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
AccountScreen.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <BottomTitle isFocused={focused}>Account</BottomTitle>
  ),
  tabBarIcon: <FontAwesome color={colors.primary} name="gear" size={20} />
};
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const styles = StyleSheet.create({
  outer: {
    flex: 1
  },
  upper: {
    zIndex: 6,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: screenHeight / 6,
    backgroundColor: colors.primaryBgColor
  },
  headerTextContainer: {
    margin: margin.sm
  },
  headerText: {
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
    fontFamily: fonts.bold,
    fontSize: fonts.md,
    color: colors.secondary
  },
  latter: {
    flex: 2
  },
  avatarContainerOuter: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    top: screenHeight / 6 - 50,
    left: 10,
    borderBottomLeftRadius: 100 / 2,
    borderBottomRightRadius: 100 / 2,
    borderTopLeftRadius: 100 / 2,
    borderTopRightRadius: 100 / 2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopColor: colors.primary,
    borderLeftColor: colors.primary,
    borderBottomColor: "#8FB1FE",
    borderRightColor: "#8FB1FE"
  },
  avatarContainer: {
    zIndex: 5,
    elevation: 5
  },
  logoutContainer: {
    padding: padding.md,
    justifyContent: "center",
    alignItems: "center"
  },
  logoutText: {
    fontFamily: fonts.bold,
    opacity: 0.6
  }
});
export default AccountScreen;
