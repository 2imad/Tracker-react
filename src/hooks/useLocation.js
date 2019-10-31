import { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';


export default (shouldTrack, callback) => {
   const [err, setErr] = useState(null);
   let [counter, setCounter] = useState(0)

   useEffect(() => {
      let subscriber;
      const startWatching = async () => {
         try {
            await requestPermissionsAsync();
            subscriber = await watchPositionAsync({
               accuracy: Accuracy.BestForNavigation,
               timeInterval: 1000,
               distanceInterval: 10 // updtae every 10 meters
            }, callback); // where addLocation gets triggered

         } catch (error) {
            setErr(error)
         }
      };

      if (shouldTrack) {
         startWatching();
      } else {
         if (subscriber) {
            subscriber.remove();
         }
         subscriber = null;
      }
      return () => {
         if (subscriber) {
            subscriber.remove();
         }
      }
   }, [shouldTrack, callback])
   return { err, counter }
}