import createDataContext from "./createDataContext";
import { getDistance } from "geolib";
import {
  TAKE_SNAPSHOT,
  ADD_CURRENT_LOCATION,
  STOP_RECORDING,
  START_RECORDING,
  ADD_LOCATION,
  CHANGE_NAME,
  RESET,
  RECORD_DISTANCE
} from "./types";

const locationReducer = (state, action) => {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    case START_RECORDING:
      return { ...state, recording: true };
    case STOP_RECORDING:
      return { ...state, recording: false };
    case ADD_LOCATION:
      const dist = getDistance(
        {
          latitude: state.initialLocation.coords.latitude,
          longitude: state.initialLocation.coords.latitude
        },
        {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.latitude
        }
      );
      return {
        ...state,
        seconds: state.seconds + 1,
        locations: [...state.locations, action.payload],
        distance: dist
      };
    case CHANGE_NAME:
      return { ...state, name: action.payload };
    case RESET:
      return { ...state, name: "", locations: [] };
    case RECORD_DISTANCE:
      return { ...state, initialLocation: action.payload };
    case TAKE_SNAPSHOT:
      return { ...state, snapShot: action.payload };
    default:
      return state;
  }
};

const takeSnapShot = dispatch => uri => {
  dispatch({ type: TAKE_SNAPSHOT, payload: uri });
};
const changeTrackName = dispatch => name => {
  dispatch({ type: CHANGE_NAME, payload: name });
};

const getUIDistance = dispatch => location => {
  dispatch({ type: RECORD_DISTANCE, payload: location });
};
const addLocation = dispatch => (location, recording) => {
  dispatch({ type: ADD_CURRENT_LOCATION, payload: location });
  if (recording) {
    dispatch({ type: ADD_LOCATION, payload: location });
  }
};
const startRecording = dispatch => () => {
  dispatch({ type: START_RECORDING });
};
const stopRecording = dispatch => () => {
  dispatch({ type: STOP_RECORDING });
};
const reset = dispatch => () => {
  dispatch({ type: RESET });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    changeTrackName,
    addLocation,
    startRecording,
    stopRecording,
    reset,
    getUIDistance,
    takeSnapShot
  },
  {
    snapShot: "",
    seconds: 0,
    initialLocation: {},
    distance: 0,
    name: "",
    locations: [],
    recording: false,
    currentLocation: null
  }
);
