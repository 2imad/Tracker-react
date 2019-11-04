import React, { Component } from "react";
import { AppLoading } from "expo";
import BottomTitle from './src/components/BottomTitle';
import * as Font from "expo-font";
import { fonts, colors } from './src/styles/base';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackSaveScreen from './src/screens/TrackSaveScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import { FontAwesome } from '@expo/vector-icons';


const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen,
  TrackSave: TrackSaveScreen
})
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  }, {
    tabBarOptions: {
      style: {
        height: 60,
        backgroundColor: colors.primaryBgColor,
        paddingTop: 5,
      }
    }
  })
});
trackListFlow.navigationOptions = {
  tabBarLabel: ({ focused }) => <BottomTitle isFocused={focused}>Tracks</BottomTitle>,
  tabBarIcon: ({ focused }) => <FontAwesome color={colors.primary} name="list" size={20} />
}
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
    return (
      < TrackProvider>
        <LocationProvider>
          <AuthProvider>
            <AppContainer ref={(navigator) => setNavigator(navigator)} />
          </AuthProvider>
        </LocationProvider>
      </TrackProvider>
    )
      ;
  }
}
