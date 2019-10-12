import '../_mockLocation';
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-navigation';
import { Text } from 'react-native-elements';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
import Map from '../components/Map'

const TrackCreateScreen = () => {
  const [err, setErr] = useState(null);
  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      await watchPositionAsync({
        accuracy: Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 10 // updtae every 10 meters
      }, (location) => {
        console.log(location)
      });
    } catch (error) {
      setErr(error)
    }
  };
  useEffect(() => {
    startWatching()
  }, [])

  return (
    <SafeAreaView forceInset={{ top: 'always' }} >
      <Text h3> Create a track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
export default TrackCreateScreen;
