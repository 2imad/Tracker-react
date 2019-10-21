import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Context as AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { FontAwesome } from '@expo/vector-icons';
const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Spacer>
        <Button title="Sing Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};
AccountScreen.navigationOptions = {
  title: 'Account',
  tabBarIcon: <FontAwesome color="#85A0DF" name="gear" size={20} />
}
const styles = StyleSheet.create({});
export default AccountScreen;
