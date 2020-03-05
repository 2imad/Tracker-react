export const sanitizeKms = distance => {
  return distance < 1000
    ? `${distance} m`
    : `${(distance / 1000).toFixed(2)} km`;
};

export const getTime = timer => {
  let miliseconds = ("0" + (Math.floor(timer / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timer / 60000) % 60)).slice(-2);
  let hours = ("0" + Math.floor(timer / 3600000)).slice(-2);
  return `${hours}:${minutes}:${seconds}:${miliseconds}`;
};
