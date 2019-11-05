import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import FormButton from '../components/formButton';
import { colors, fonts, padding, margin } from '../styles/base';

import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackSaveScreen = () => {
   const { state: { name }, changeTrackName } = useContext(LocationContext)
   const [saveTrack] = useSaveTrack()
   const submit = () => {
      changeTrackName(name)
      saveTrack()
   }
   return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
         <View style={styles.inner}>
            <View style={styles.headerContainer}>
               <Text style={styles.title}> Save Your track </Text>
            </View>
            <View style={styles.inputContainer}>
               <TextInput style={styles.input}
                  value={name}
                  onChangeText={changeTrackName}
                  placeholder="Enter Track name"
                  placeholderTextColor="rgba(255,255,255,0.8)"
                  autoCorrect={false}

               />
            </View>
            <View style={styles.buttonContainer}>
               <TouchableOpacity onPress={submit}><FormButton title={'SAVE'} /></TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   )
}
TrackSaveScreen.navigationOptions = {
   header: null
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: colors.primaryBgColor,
   },
   inputContainer: {
      padding: padding.md,
      marginTop: margin.md,
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
      padding: padding.lg,
      fontFamily: fonts.primary,
      color: colors.primary,
      fontSize: 18,
      textAlign: 'center',
      marginTop: 5,
      opacity: .8
   },
   buttonContainer: {
      paddingVertical: padding.md,
      flexDirection: 'row',
      justifyContent: 'center',
   }
})
export default TrackSaveScreen;