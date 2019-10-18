import createDataContext from './createDataContext';
import trackApi from '../api/tracker';
import { FETCH_TRACKS } from './types';

const trackReducer = (state, action) => {
   switch (action.type) {
      case FETCH_TRACKS:
         return action.payload;
      default:
         return state;
   }
}

const fetchTracks = dispatch => async () => {
   const response = await trackApi.get('/tracks');
   dispatch({ type: FETCH_TRACKS, payload: response.data })
}

const createTrack = dispatch => async (name, locations) => {
   await trackApi.post('/tracks', { name, locations });
}

export const { Context, Provider } = createDataContext(
   trackReducer,
   { fetchTracks, createTrack },
   []
)