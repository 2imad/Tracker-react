import React, { useState } from "react";
import { colors, padding, fonts } from '../styles/base'
import {
   Button,
   Platform,
   StyleSheet,
   Text,
   Image,
   TouchableWithoutFeedback,
   StatusBar, TextInput,
   SafeAreaView,
   Keyboard,
   KeyboardAvoidingView,
   View,
   TouchableOpacity
}
   from "react-native";
import NavLink from "./NavLink";

const Form = ({ error, headerTitle, buttonTitle, onSubmit, route, linkText }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : null}
         style={{ flex: 1 }}
      >
         <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={styles.inner}>
                  <View style={styles.logoContainer}>
                     <Text style={styles.title}> {headerTitle} </Text>
                  </View>
                  <View style={styles.inputContainer} >
                     <TextInput style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        keyboardType="email-address"
                        returnKeyType="next"
                        autoCorrect={false}
                     //onSubmitEditing={() => refs.txtPassword.focus()}
                     />
                     <TextInput style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter password"
                        placeholderTextColor="rgba(255,255,255,0.8)"
                        secureTextEntry={true}
                        returnKeyType="go"
                        autoCorrect={false}
                     //refs={"txtPassword"}
                     />
                     {error ? <Text style={styles.error}>{error}</Text> : null}
                     <TouchableOpacity style={styles.buttonContainer}
                        onPress={() => onSubmit({ email, password })}
                     >
                        <Text style={styles.buttonText}> {buttonTitle} </Text>
                     </TouchableOpacity>
                     <NavLink
                        route={route}
                        linkText={linkText}
                     />
                  </View>
                  <View style={{ flex: 1 }} />
               </View>
            </TouchableWithoutFeedback>
         </SafeAreaView>
      </KeyboardAvoidingView>
   );
};


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.primaryBgColor,
   },
   inner: {
      flex: 1,
      justifyContent: 'flex-start'
   },
   logo: {
      width: 128,
      height: 100,
   },
   logoContainer: {
      justifyContent: 'flex-end',
      flex: 1
   },
   input: {
      fontFamily: fonts.primary,
      paddingHorizontal: padding.sm - 2,
      marginBottom: padding.sm,
      height: 40,
      color: colors.secondary,
      backgroundColor: 'rgba(255,255,255,.2)'
   },
   title: {
      fontFamily: fonts.primary,
      color: colors.primary,
      fontSize: 18,
      textAlign: 'center',
      marginTop: 5,
      opacity: .8
   },
   inputContainer: {
      marginTop: 20,
      padding: 40
   },
   buttonText: {
      textAlign: 'center',
      color: 'rgb(32,53,70)',
      fontWeight: 'bold',
      fontSize: 18,
      fontFamily: fonts.primary
   },
   buttonContainer: {
      backgroundColor: colors.primary,
      paddingVertical: 10
   },
   error: {
      color: colors.primary,
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 4
   }
});
export default Form;