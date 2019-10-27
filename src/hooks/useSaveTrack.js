import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';
export default () => {
   const { createTrack } = useContext(TrackContext);
   const { state: { locations, name, distance }, reset } = useContext(LocationContext)

   const saveTrack = async () => {
      await createTrack(name, locations, distance);
      reset();
      navigate('TrackList');
   }
   return [saveTrack]
}