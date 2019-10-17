import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';

const TrackForm = () => {

   const {
      state: { name, recording },
      startRecording,
      stopRecording,
      changeTrackName
   } = useContext(LocationContext)

   return (
      <>
         <Spacer>
            <Input value={name} onChangeText={changeTrackName} placeholder="Enter Track name" />
         </Spacer>
         {recording
            ? <Button onPress={stopRecording} title="Stop recording" raised />
            : <Button onPress={startRecording} title="Start recording" raised />
         }

         <Spacer />
      </>
   )
}

export default TrackForm;