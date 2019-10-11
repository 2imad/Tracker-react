import React, { useContext } from "react";
import Form from '../components/Form';

import { Context as AuthContext } from '../context/AuthContext'
import { NavigationEvents } from "react-navigation";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);
  return (
    <>
      <NavigationEvents
        onWillBlur={clearErrorMessage}
      />
      <Form
        error={state.errorMessage}
        headerTitle='Sign Up With Tracker'
        buttonTitle='Sign Up'
        linkText='You already have an account? sign in instead'
        route='Signin'
        onSubmit={signup}
      />
    </>
  );
};
SignupScreen.navigationOptions = () => {
  return {
    header: null,
  };
};
export default SignupScreen;
