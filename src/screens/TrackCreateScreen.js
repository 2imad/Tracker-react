//import '../_mockLocation';
import React, { useContext, useCallback, useEffect } from "react";
import BottomTitle from '../components/BottomTitle';
import { colors, fonts } from '../styles/base';
import { View, StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation'
import TrackForm from "../components/TrackForm";
import {
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';
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
    <>
      <View style={styles.backGroundContainer} />
      <View style={styles.mapContainer}>
        <Map />
      </View>
      {err ? <Text>Please enable location services</Text> : null}
      <View style={styles.formContainer}>
        <View style={styles.distanceContainer}>
          <View>
            <Text style={styles.textStyle}><MaterialCommunityIcons name="run-fast" size={35} /></Text>
            <Text style={styles.valueStyle}>{distance}</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>Time</Text>
            <Text style={styles.valueStyle}>00:32:58 sec</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TrackForm />
        </View>
      </View>

    </>
  );
};
TrackCreateScreen.navigationOptions = {
  tabBarLabel: ({ focused }) => <BottomTitle isFocused={focused}>Add Track</BottomTitle>,
  tabBarIcon: <FontAwesome color={colors.primary} name="plus" size={20} />

}
const styles = StyleSheet.create({
  backGroundContainer: {
    height: 200,
    borderWidth: 2,
    backgroundColor: 'orange',
    borderColor: 'rgba(0,0,0,0)',
  },
  mapContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 30,
    left: 15,
    right: 15,
    elevation: 4
  },
  distanceContainer: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    borderWidth: 3,
    borderColor: 'green'
  },
  formContainer: {
    flex: 1,
  },
  textStyle: {
    fontSize: fonts.lg,
    fontFamily: fonts.primary
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});
export default withNavigationFocus(TrackCreateScreen);
