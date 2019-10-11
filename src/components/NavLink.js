import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { withNavigation } from 'react-navigation'

const NavLink = ({ navigation, route, linkText }) => {
   return (
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate(route)}>
         <Text style={styles.linkText} >{linkText}</Text>
      </TouchableOpacity>
   )
}
const styles = StyleSheet.create({
   link: {
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20
   },
   linkText: {
      fontFamily: "Montserrat",
      color: '#84A0DF'
   }
})

export default withNavigation(NavLink)