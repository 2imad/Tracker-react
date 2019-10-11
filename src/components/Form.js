import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import NavLink from "./NavLink";

const Form = ({ error, headerTitle, buttonTitle, onSubmit, route, linkText }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   return (
      <View style={styles.container}>
         <Spacer>
            <Text style={styles.text} h3>
               {headerTitle}
            </Text>
         </Spacer>
         <Input
            autoCapitalize='none'
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            labelStyle={styles.label} label="Email" />
         <Spacer />
         <Input
            autoCorrect={false}
            autoCapitalize='none'
            value={password}
            onChangeText={setPassword}
            labelStyle={styles.label} label="Password"
            secureTextEntry
         />
         {error ? <Text style={styles.error}>{error}</Text> : null}
         <Spacer>
            <Button onPress={() => onSubmit({ email, password })} style={{ marginTop: 60, ...styles.label }} title={buttonTitle} />
         </Spacer>
         <NavLink
            route={route}
            linkText={linkText}
         />
      </View>
   );
};


const styles = StyleSheet.create({
   error: {
      marginTop: 10,
      marginLeft: 6,
      fontSize: 15,
      color: 'red'
   },
   label: {
      fontFamily: "Montserrat"
   },
   text: {
      fontFamily: "Montserrat",
      textAlign: "center",
      marginBottom: 30
   },
   container: {
      flex: 1,
      justifyContent: "center",
      marginBottom: 150
   }
});

export default Form;