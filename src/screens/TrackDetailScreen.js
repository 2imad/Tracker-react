import React, { useContext, useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { Context as TrackContext } from '../context/TrackContext';
import MapView, { Polyline } from 'react-native-maps';

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext)
  const _id = navigation.getParam('_id');
  const track = state.find(t => t._id === _id);
  const initialCoords = track.locations[0].coords;


  return (
    <View>
      <Text> {track.name} </Text>
      <View ref={captureViewRef}>
        <Text>  TEST Element </Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
      >
        <Polyline
          fillColor="#FF5533"
          strokeWidth={8}
          strokeColor="#FF5533"
          coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  img: {
    width: 400,
    height: 200,
    borderWidth: 4,
    borderColor: 'green'
  },
  map: {
    height: 300
  }
});
export default TrackDetailScreen;
