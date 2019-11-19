import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";
import {
  ADD_ERROR,
  CHANGE_PROFILE_NAME,
  FETCH_PROFILE_NAME,
  FETCH_PROFILE_PHOTO
} from "./types";

const profileReducer = (state, action) => {
  switch (action.type) {
    case FETCH_PROFILE_PHOTO:
      return { ...state, image: action.payload };
    case CHANGE_PROFILE_NAME:
      return { ...state, name: action.payload };
    case FETCH_PROFILE_NAME:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
const changeProfileName = dispatch => name => {
  dispatch({ type: CHANGE_PROFILE_NAME, payload: name });
};

const addProfilePhoto = dispatch => {
  return async uri => {
    try {
      await trackerApi.post("/photo", { uri });
    } catch (e) {
      dispatch({
        type: ADD_ERROR,
        payload: "Unable to add your Name, try again later"
      });
    }
  };
};
const getProfilePhoto = dispatch => async () => {
  const response = await trackerApi.get("/photo");
  dispatch({ type: FETCH_PROFILE_PHOTO, payload: response.data[0].image_uri });
};
const getProfileName = dispatch => async () => {
  const response = await trackerApi.get("/profile");
  dispatch({
    type: FETCH_PROFILE_NAME,
    payload: response.data[0].name
  });
};

const submitProfileName = dispatch => {
  return async name => {
    try {
      await trackerApi.post("/profile", { name });
      navigate("TrackList");
    } catch (error) {
      dispatch({
        type: ADD_ERROR,
        payload: "Unable to add your Name, try again later"
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  profileReducer,
  {
    submitProfileName,
    changeProfileName,
    getProfileName,
    addProfilePhoto,
    getProfilePhoto
  },
  { name: "", profile: "", image: null }
);
