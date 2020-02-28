import createDataContext from "./createDataContext";
import trackApi from "../api/tracker";
import { FETCH_TRACKS, IS_FETCHING } from "./types";

const trackReducer = (state, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return { ...state, isFetching: true };
    case FETCH_TRACKS:
      return {
        ...state,
        tracks: [...action.payload],
        isFetching: false
      };
    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  dispatch({ type: IS_FETCHING });
  const response = await trackApi.get("/tracks");
  dispatch({ type: FETCH_TRACKS, payload: response.data });
};

const createTrack = dispatch => async (
  name,
  locations,
  snapShot,
  distance,
  seconds
) => {
  try {
    await trackApi.post("/tracks", {
      name,
      locations,
      snapShot,
      distance,
      seconds
    });
  } catch (error) {
    console.log(error);
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  { tracks: [], isFetching: false }
);
