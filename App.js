import React, { Component } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
});
const AppContainer = createAppContainer(switchNavigator);
export default class App extends Component {
  state = {
    loader: false
  };
  componentDidMount() {
    this._loadFontsAsync();
  }
  _loadFontsAsync = async () => {
    await Font.loadAsync({
      Montserrat: require("./assets/fonts/Montserrat.ttf")
    });
    this.setState({ loaded: true });
  };
  render() {
    if (!this.state.loaded) {
      return <AppLoading />;
    }
    return <AppContainer />;
  }
}
