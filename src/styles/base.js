import { StyleSheet, Dimensions } from "react-native";

export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width
};
export const colors = {
  primaryBgColor: "rgb(32,53,70)",
  primary: "#f7c744", // yellow
  secondary: "#fff", // white
  tertiary: "rgba(32,53,70,.8)", // blue
  orangeRed: "#E85D37"
};
export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
};
export const margin = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
};
export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
  primary: "Montserrat",
  bold: "Montserrat_bold"
};
