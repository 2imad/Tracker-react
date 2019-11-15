import React, { useContext } from "react";
import Form from '../components/Form';

import { Context as AuthContext } from '../context/AuthContext'
import { NavigationEvents } from "react-navigation";

const SignIn = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <>
      <NavigationEvents
        onWillBlur={clearErrorMessage}
      />
      <Form
        error={state.errorMessage}
        headerTitle='Sign in'
        buttonTitle='Sign in'
        linkText='You do not have an account yet? Sign up instead!'
        route='Signup'
        submitForm={signin}
      />
    </>
  );
};
SignIn.navigationOptions = () => {
  return {
    header: null,
  };
};
export default SignIn;