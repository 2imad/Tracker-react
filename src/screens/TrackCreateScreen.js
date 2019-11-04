import '../_mockLocation';
import React, { useContext, useCallback, useEffect, useState } from "react";
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
  MaterialCommunityIcons,

} from '@expo/vector-icons';
import { getCurrentPositionAsync } from 'expo-location';

const TrackCreateScreen = ({ isFocused }) => {
  const { state: { recording, distance, seconds }, addLocation, getUIDistance, upDateCounter } = useContext(LocationContext);
  const _getUserLocation = async () => {
    try {
      const loc = await getCurrentPositionAsync();
      getUIDistance(loc)
    } catch (err) {
      console.log(err)
    }
  }
  const callback = useCallback((location) => {
    addLocation(location, recording, seconds);
  }, [recording])

  useEffect(() => {
    _getUserLocation();
  }, [])
  const { err } = useLocation(isFocused || recording, callback);
  const getMinutes = () => {
    return Math.floor(seconds / 60);
  }
  const getSeconds = () => {
    return ('0' + seconds % 60).slice(-2);
  }
  return (
    <>
      <View style={styles.backGroundContainer} />
      <View style={styles.mapContainer}>
        <Map />
      </View>
      {err ? <Text>Please enable location services</Text> : null}
      <View style={styles.formContainer}>
        <View style={styles.distanceContainer}>
          <View style={styles.iconHolder}>
            <Text style={styles.textStyle}><MaterialCommunityIcons name="run-fast" color={colors.orangeRed} size={40} /></Text>
            <Text style={styles.valueStyle}>{distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(2)} km`}</Text>
          </View>
          <View style={styles.iconHolder}>
            <Text style={styles.textStyle}><MaterialCommunityIcons name="timer" color={colors.orangeRed} size={40} /></Text>
            <Text style={styles.valueStyle}>{getMinutes()}:{getSeconds()}{getMinutes() < 1 ? ' s' : ' min'}</Text>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  formContainer: {
    backgroundColor: colors.primaryBgColor,
    flex: 1,
  },
  valueStyle: {
    fontSize: fonts.md,
    color: colors.secondary,
    fontFamily: fonts.primary
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconHolder: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  }
});
export default withNavigationFocus(TrackCreateScreen);
