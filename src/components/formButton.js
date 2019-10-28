import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";



const FormButton = ({ title }) => {
   return (
      <View style={styles.outerContainer}>
         <View style={styles.innerContainer}>
            <Text style={styles.innerText}> {title} </Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   outerContainer: {
      borderWidth: 6,
      borderColor: '#E85D37',
      height: 100,
      width: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
   },
   innerContainer: {
      borderWidth: 5,
      backgroundColor: '#f7c744',
      borderColor: '#f7c744',
      height: 80,
      width: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center'
   },
   innerText: {
      fontSize: 18,
      color: '#fff'
   }
});

export default FormButton;
