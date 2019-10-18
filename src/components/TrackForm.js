import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';

const TrackForm = () => {

   const {
      state: { name, recording, locations },
      startRecording,
      stopRecording,
      changeTrackName
   } = useContext(LocationContext)

   return (
      <>
         <Spacer>
            <Input value={name} onChangeText={changeTrackName} placeholder="Enter Track name" />
         </Spacer>
         <Spacer>
            {recording
               ? <Button onPress={stopRecording} title="Stop recording" raised />
               : <Button onPress={startRecording} title="Start recording" raised />
            }
         </Spacer>
         <Spacer>
            {
               !recording && locations.length
                  ? <Button title="Save Track" raised />
                  : null
            }
         </Spacer>

         <Spacer />
      </>
   )
}

export default TrackForm;