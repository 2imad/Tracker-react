export const sanitizeKms = (distance) => {
   return distance < 1000 ? `${distance} m` : `${(distance / 1000).toFixed(2)} km`
}