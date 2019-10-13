import { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';


export default (shouldTrack, callback) => {
   const [err, setErr] = useState(null);
   const [subscriber, setSubscriber] = useState(null)

   const startWatching = async () => {
      try {
         await requestPermissionsAsync();
         const sub = await watchPositionAsync({
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10 // updtae every 10 meters
         }, callback); // where addLocation gets triggered
         setSubscriber(sub)
      } catch (error) {
         setErr(error)
      }
   };
   useEffect(() => {
      if (shouldTrack) {
         startWatching()
      } else {
         subscriber.remove();
         setSubscriber(null)
      }
   }, [shouldTrack])
   return [err]
}