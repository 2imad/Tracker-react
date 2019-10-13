import createDataContext from "./createDataContext";
import { ADD_CURRENT_LOCATION } from './types';
const locationReducer = (state, action) => {
   switch (action.type) {
      case ADD_CURRENT_LOCATION:
         return { ...state, currentLocation: action.payload }
      default:
         return state;
   }
};

const addLocation = dispatch => (location) => {
   dispatch({ type: ADD_CURRENT_LOCATION, payload: location })
};
const startRecording = dispatch => () => { };
const stopRecording = dispatch => () => { };

export const { Context, Provider } = createDataContext(
   locationReducer,
   { addLocation, startRecording, stopRecording },
   { locations: [], recording: false, currentLocation: null }
);
