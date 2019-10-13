import * as Location from 'expo-location';

const tenMetersWithDegress = 0.0001;

const getLocation = increment => {
   return {
      timestamp: 1000000,
      coords: {
         speed: 0,
         heading: 0,
         accuracy: 0,
         altitudeAccuracy: 5,
         altitude: 5,
         longitude: 4.407078 + increment * tenMetersWithDegress,
         latitude: 50.848993 + increment * tenMetersWithDegress

      }
   };
};

let counter = 0;
setInterval(() => {
   Location.EventEmitter.emit('Expo.locationChanged', {
      watchId: Location._getCurrentWatchId(),
      location: getLocation(counter)
   })
   counter++
}, 1000)