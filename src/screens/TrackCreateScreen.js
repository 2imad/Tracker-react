import '../_mockLocation';
import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation'
import TrackForm from "../components/TrackForm";


const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext)
  const [err, setErr] = useLocation(isFocused, (location) => {
    addLocation(location, state.recording)

  })

  return (
    <SafeAreaView forceInset={{ top: 'always' }} >
      <View style={styles.container}>
        <Text style={styles.text} h3> Create a track</Text>
        <View style={styles.mapContainer} >
          <Map />
        </View>
      </View>
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat',
    alignSelf: 'center',
    marginVertical: 10
  },
  container: {
  },
  mapContainer: {
    marginHorizontal: 5
  }
});
export default withNavigationFocus(TrackCreateScreen);
