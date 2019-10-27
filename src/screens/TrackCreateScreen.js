import '../_mockLocation';
import React, { useContext, useCallback, useEffect } from "react";
import BottomTitle from '../components/BottomTitle';
import { colors } from '../styles/base';
import { View, StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation'
import TrackForm from "../components/TrackForm";
import { FontAwesome } from '@expo/vector-icons';
import { getCurrentPositionAsync } from 'expo-location';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording, distance }, addLocation, getUIDistance } = useContext(LocationContext);

  const _getUserLocation = async () => {
    try {
      const loc = await getCurrentPositionAsync();
      getUIDistance(loc)
    } catch (err) {
      console.log(err)
    }
  }
  const callback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording])

  useEffect(() => {
    _getUserLocation();
  }, [])
  const { err, setErr } = useLocation(isFocused || recording, callback)

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
      <View>
        <Text> {distance} </Text>
      </View>
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  tabBarLabel: ({ focused }) => <BottomTitle isFocused={focused}>Add Track</BottomTitle>,
  tabBarIcon: <FontAwesome color={colors.primary} name="plus" size={20} />

}
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
