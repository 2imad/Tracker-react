//
import "../_mockLocation";
import React, { useContext, useCallback, useEffect, useRef } from "react";
import BottomTitle from "../components/BottomTitle";
import { colors } from "../styles/base";
import { View, StyleSheet } from "react-native";
import { withNavigationFocus } from "react-navigation";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import ViewShot from "react-native-view-shot";
import { FontAwesome } from "@expo/vector-icons";
import { getCurrentPositionAsync } from "expo-location";
import Timer from "../components/Timer";
const TrackCreateScreen = ({ isFocused, navigation }) => {
  const full = useRef();
  const {
    state: { recording },
    addLocation,
    getUIDistance,
    takeSnapShot
  } = useContext(LocationContext);

  const callback = useCallback(
    location => {
      addLocation(location, recording);
    },
    [recording]
  );

  useEffect(() => {
    async function _getUserLocation() {
      try {
        const loc = await getCurrentPositionAsync();
        getUIDistance(loc);
      } catch (err) {
        console.log(err);
      }
    }
    _getUserLocation();
  }, []);

  const { err } = useLocation(isFocused || recording, callback);

  const onCapture = useCallback(async () => {
    const res = await full.current.capture();
    await takeSnapShot(res);
    navigation.navigate("TrackSave");
  }, []);
  return (
    <>
      <View style={styles.backGroundContainer} />
      <ViewShot
        ref={full}
        style={styles.mapContainer}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <Map />
      </ViewShot>
      {err ? <Text>Please enable location services</Text> : null}
      <View style={styles.formContainer}>
        <Timer />
        <View style={styles.buttonContainer}>
          <TrackForm onCapture={onCapture} />
        </View>
      </View>
    </>
  );
};
TrackCreateScreen.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <BottomTitle isFocused={focused}>Add Track</BottomTitle>
  ),
  tabBarIcon: <FontAwesome color={colors.primary} name="plus" size={20} />
};
const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.primaryBgColor,
    flex: 1
  },
  backGroundContainer: {
    height: 200,
    borderWidth: 2,
    backgroundColor: colors.primary,
    borderColor: "rgba(0,0,0,0)"
  },
  mapContainer: {
    zIndex: 1,
    position: "absolute",
    top: 30,
    left: 15,
    right: 15,
    elevation: 4
  },

  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  }
});
export default withNavigationFocus(TrackCreateScreen);
