import React, { useContext } from 'react';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Marker, Circle } from 'react-native-maps'
import { Context as LocationContaxt } from '../context/LocationContext';
import { hasStartedLocationUpdatesAsync } from 'expo-location';


const Map = () => {
  const { state: { currentLocation, locations } } = useContext(LocationContaxt);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />
  }

  return <MapView
    initialRegion={{
      ...currentLocation.coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }}
    style={styles.map}>
    <Circle
      center={currentLocation.coords}
      radius={30}
      strokeColor="rgba(168, 241, 209,1.0)"
      fillColor="rgba(168, 241, 209,.3)"
    />
    <Polyline coordinates={locations.map(loc => loc.coords)} />
  </MapView>
}
const styles = StyleSheet.create({
  map: {
    height: 200
  }
})
export default Map;