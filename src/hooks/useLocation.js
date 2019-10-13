import { useEffect, useState } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';
export default (callback) => {
   const [err, setErr] = useState(null);
   const startWatching = async () => {
      try {
         await requestPermissionsAsync();
         await watchPositionAsync({
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10 // updtae every 10 meters
         }, callback); // where addLocation gets triggered
      } catch (error) {
         setErr(error)
      }
   };
   useEffect(() => {
      startWatching()
   }, [])
   return [err]
}