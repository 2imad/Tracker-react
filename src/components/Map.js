import React, { useContext } from "react";
import { Text, StyleSheet, ActivityIndicator, View } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Context as LocationContaxt } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations }
  } = useContext(LocationContaxt);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        initialRegion={{
          ...currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        style={styles.map}
      >
        <Marker coordinate={currentLocation.coords}>
          <View style={styles.radius}>
            <View style={styles.marker} />
          </View>
        </Marker>
        <Polyline
          fillColor="#FF5533"
          strokeWidth={8}
          strokeColor="#FF5533"
          coordinates={locations.map(loc => loc)}
        />
      </MapView>
    </View>
  );
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
  }
});
export default Map;
