import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps'

const Map = () => {
  return <MapView
    initialRegion={{
      latitude: 37.3323,
      longitude: -122.03121,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    }}
    style={styles.map}>
    <Polyline />
  </MapView>
}
const styles = StyleSheet.create({
  map: {
    height: 300
  }
})
export default Map;