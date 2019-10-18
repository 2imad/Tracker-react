import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';
import { ADD_ERROR, SIGN_IN, CLEAR_ERROR, SIGN_OUT } from './types';

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, token: action.payload }
    case ADD_ERROR:
      return { errorMessage: '', errorMessage: action.payload }
    case CLEAR_ERROR:
      return { ...state, errorMessage: '' }
    case SIGN_OUT:
      return { token: null }
    default:
      return state;
  }
}

const autoSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: SIGN_IN, payload: token });
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: CLEAR_ERROR })
}

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signup', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: SIGN_IN, payload: response.data.token });
      navigate('TrackList');
    } catch (err) {
      dispatch({ type: ADD_ERROR, payload: 'Something went wrong!' })
    }
  }
}
const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerApi.post('/signin', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: SIGN_IN, payload: response.data.token });
      navigate('TrackList');
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: 'Something went wrong!' })
    }
  }
}

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: SIGN_OUT });
  navigate('Signup')
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, autoSignIn },
  { token: null, errorMessage: '' }
)