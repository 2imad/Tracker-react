import createDataContext from './createDataContext';

const trackReducer = (state, action) => {
   switch (action.type) {
      default:
         return state;
   }
}

const fetchTracks = dispatch => () => { }
const addTrack = dispatch => () => { }

export const { Context, Provider } = createDataContext(
   trackReducer,
   { fetchTracks, addTrack },
   []
)