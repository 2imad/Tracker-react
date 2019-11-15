import React from "react";
import { colors, padding, fonts } from '../styles/base'
import {
   ActivityIndicator,
   Platform,
   StyleSheet,
   Text,
   TouchableWithoutFeedback,
   TextInput,
   SafeAreaView,
   Keyboard,
   KeyboardAvoidingView,
   View,
   TouchableOpacity
}
   from "react-native";
import { NavigationEvents } from 'react-navigation';
import NavLink from "./NavLink";
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
   email: yup
      .string()
      .label()
      .email('Email must be valid')
      .required('This is a required field'),
   password: yup
      .string()
      .label()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')

})
const Form = ({ error, headerTitle, buttonTitle, submitForm, route, linkText, isLoading }) => {
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : null}
         style={{ flex: 1 }}
      >
         <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
               actions.setSubmitting(true);
               const { email, password } = values
               submitForm({ email, password });
               actions.setSubmitting(false);
            }}
            validationSchema={validationSchema}
         >
            {formikProps => (
               <>
                  <NavigationEvents onWillBlur={() => formikProps.setErrors("")} />
                  <SafeAreaView style={styles.container}>
                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.inner}>
                           <View style={styles.logoContainer}>
                              <Text style={styles.title}> {headerTitle} </Text>
                           </View>
                           <View style={styles.inputContainer} >
                              <TextInput style={styles.input}
                                 //value={email}
                                 onChangeText={formikProps.handleChange('email')}
                                 onBlur={formikProps.handleBlur('email')}
                                 placeholder="Enter email"
                                 placeholderTextColor="rgba(255,255,255,0.8)"
                                 keyboardType="email-address"
                                 returnKeyType="next"
                                 autoCorrect={false}
                              />
                              <Text style={{ color: 'red', marginBottom: padding.sm }}> {formikProps.touched.email && formikProps.errors.email} </Text>
                              <TextInput style={styles.input}
                                 //value={password}
                                 onChangeText={formikProps.handleChange('password')}
                                 onBlur={formikProps.handleBlur('password')}
                                 placeholder="Enter password"
                                 placeholderTextColor="rgba(255,255,255,0.8)"
                                 secureTextEntry={true}
                                 returnKeyType="go"
                                 autoCorrect={false}
                              />

                              <Text style={{ color: 'red', marginBottom: padding.sm }}> {formikProps.touched.password && formikProps.errors.password} </Text>
                              {isLoading
                                 ?
                                 <ActivityIndicator />
                                 :
                                 <TouchableOpacity style={styles.buttonContainer}
                                    onPress={formikProps.handleSubmit}
                                 >
                                    <Text style={styles.buttonText}> {buttonTitle} </Text>
                                 </TouchableOpacity>
                              }
                              {error ? <Text style={{ color: 'red', marginTop: 3 }}>{error}</Text> : null}
                              <NavLink
                                 route={route}
                                 linkText={linkText}
                              />
                           </View>
                           <View style={{ flex: 1 }} />
                        </View>
                     </TouchableWithoutFeedback>
                  </SafeAreaView>

               </>
            )}
         </Formik>
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
      //marginBottom: padding.sm,
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