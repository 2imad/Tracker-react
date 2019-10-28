import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from './formButton'
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';


const TrackForm = () => {
   const {
      state: { name, recording, locations },
      startRecording,
      stopRecording,
      changeTrackName
   } = useContext(LocationContext);
   const [saveTrack] = useSaveTrack();

   return (
      <>
         {recording
            ? (<TouchableOpacity onPress={stopRecording}><FormButton title={'STOP'} /></TouchableOpacity>)
            : (<TouchableOpacity onPress={startRecording}><FormButton title={'START'} /></TouchableOpacity>)
         }
         {
            !recording && locations.length
               ? <TouchableOpacity onPress={saveTrack}><FormButton title={'SAVE'} /></TouchableOpacity>
               : null
         }
      </>
   )
}

const styles = StyleSheet.create({

})

export default TrackForm;