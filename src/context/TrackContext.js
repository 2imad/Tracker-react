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

const createTrack = dispatch => async (name, locations, snapShot, distance) => {
   try {
      await trackApi.post('/tracks', { name, locations, snapShot, distance });
   } catch (error) {
      console.log(error)
   }
}

export const { Context, Provider } = createDataContext(
   trackReducer,
   { fetchTracks, createTrack },
   []
)