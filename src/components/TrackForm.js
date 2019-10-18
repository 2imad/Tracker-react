import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Spacer from './Spacer';
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
         <Spacer>
            <Input value={name} onChangeText={changeTrackName} placeholder="Enter Track name" />
         </Spacer>
         <Spacer>
            {recording
               ? <Button onPress={stopRecording} style={styles.btnText} title="Stop recording" raised />
               : <Button onPress={startRecording} style={styles.btnText} title="Start recording" raised />
            }
         </Spacer>
         <Spacer>
            {
               !recording && locations.length
                  ? <Button onPress={saveTrack} style={styles.btnText} title="Save Track" raised />
                  : null
            }
         </Spacer>

         <Spacer />
      </>
   )
}

const styles = StyleSheet.create({
   btnText: {
      fontFamily: 'Montserrat'
   }
})

export default TrackForm;