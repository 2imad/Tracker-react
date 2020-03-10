import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline, Marker } from "react-native-maps";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { fonts, colors, margin, padding } from "../styles/base";
const TrackDetailScreen = ({ navigation }) => {
  const {
    state: { tracks }
  } = useContext(TrackContext);
  const _id = navigation.getParam("_id");
  const track = tracks.find(t => t._id === _id);
  console.log(track);
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: colors.primaryBgColor }}
        forceInset={{ top: "always" }}
      ></SafeAreaView>
      <View style={styles.trackNameContainer}>
        <Text style={styles.trackName}> {track.name} </Text>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={{
            ...track.locations[0],
            latitudeDelta: 0.06,
            longitudeDelta: 0.06
          }}
          style={styles.map}
        >
          <Polyline
            fillColor="#FF5533"
            strokeWidth={8}
            strokeColor="#FF5533"
            coordinates={track.locations.map(loc => loc)}
          />
        </MapView>
      </View>
      <View style={styles.trackValues}>
        <View style={styles.details}>
          <View style={styles.time}>
            <Text style={styles.trackName}> Track duration </Text>
            <Text style={styles.trackName}> {track.timeElapsed} </Text>
          </View>
          <View style={styles.action}></View>
        </View>
      </View>
    </>
  );
};
TrackDetailScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  mapContainer: {
    borderWidth: 3,
    borderColor: "rgba(0,0,0,0)",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  trackNameContainer: {
    paddingVertical: padding.sm,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBgColor
  },
  trackName: {
    fontFamily: fonts.primary,
    fontSize: fonts.md,
    color: colors.secondary
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(32,53,70,.1)",
    borderWidth: 1,
    borderColor: "rgba(32,53,70,.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "#f7c744"
  },
  map: {
    height: 250
  },
  details: {
    backgroundColor: colors.primaryBgColor,
    flex: 1
  },
  trackValues: {
    flex: 1
  },
  time: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  action: {
    flex: 1
  }
});
export default TrackDetailScreen;
