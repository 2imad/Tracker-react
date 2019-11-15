import React, { useContext } from "react";
import { Context as AuthContext } from '../context/AuthContext';
import { Dimensions } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import BottomTitle from '../components/BottomTitle';
import { colors } from '../styles/base'
import { Button, Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    /*  <SafeAreaView forceInset={{ top: 'always' }}>
       <Spacer>
         <Button title="Sing Out" onPress={signout} />
       </Spacer>
     </SafeAreaView> */
    <View style={styles.outer}>
      <View style={styles.upper}>
        <View style={styles.avatarContainerOuter} >
          <View style={styles.avatarContainer}>
            <Avatar
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
              size={80} rounded title="MD"
            />
          </View>
        </View>
      </View>
      <View style={styles.latter}>
        <Button title="Sing Out" onPress={signout} />
      </View>
    </View>

  );
};
AccountScreen.navigationOptions = {
  tabBarLabel: ({ focused }) => <BottomTitle isFocused={focused}>Account</BottomTitle>,
  tabBarIcon: <FontAwesome color={colors.primary} name="gear" size={20} />
}
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  outer: {
    flex: 1
  },
  upper: {
    height: screenHeight / 4,
    backgroundColor: '#6CD68B'
  },
  latter: {
    flex: 1.5,
  },
  avatarContainerOuter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    top: (screenHeight / 4) - 45,
    left: 10,
    borderBottomLeftRadius: 100 / 2,
    borderBottomRightRadius: 100 / 2,
    borderTopLeftRadius: 100 / 2,
    borderTopRightRadius: 100 / 2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopColor: colors.primary,
    borderLeftColor: colors.primary,
    borderBottomColor: '#8FB1FE',
    borderRightColor: '#8FB1FE'

  },
  avatarContainer: {
    /*  position: 'absolute',
     top: (screenHeight / 4) - 45,
     left: 10, */
    zIndex: 50,

  }
});
export default AccountScreen;
