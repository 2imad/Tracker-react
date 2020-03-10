import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { fonts, colors, margin, padding } from "../styles/base";
import { centerItems } from "../styles/layout";
import { Entypo } from "@expo/vector-icons";
import { sanitizeKms } from "../config/helpers";

const TrackListItem = ({ title, distance, timeElapsed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarInnerContainer}>
          <Avatar
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
            }}
            size={30}
            rounded
            title="MD"
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.header}> {title} </Text>
        <View style={styles.rankingContainer}>
          <Text style={styles.ranking}>Distance</Text>
          <Text style={styles.ranking}>{sanitizeKms(distance)}</Text>
        </View>
        <View style={styles.rankingContainer}>
          <Text style={styles.ranking}>Time</Text>
          <Text style={styles.ranking}>{timeElapsed}</Text>
        </View>
      </View>
      <Entypo style={styles.icon} name="chevron-thin-right" size={20} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBgColor,
    borderBottomWidth: 0.5,
    borderColor: colors.secondary,
    flexDirection: "row",
    height: 80
  },
  avatarContainer: {
    paddingHorizontal: padding.sm,
    ...centerItems
  },
  avatarInnerContainer: {
    height: 40,
    width: 40,
    borderWidth: 4,
    borderRadius: 40,
    borderColor: colors.orangeRed,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    fontSize: fonts.md,
    paddingHorizontal: padding.sm,
    ...centerItems
  },
  header: {
    fontFamily: fonts.primary,
    fontSize: fonts.md,
    color: colors.primary
  },
  rankingContainer: {
    flexDirection: "row"
  },
  ranking: {
    marginLeft: margin.sm - 5,
    fontFamily: fonts.primary,
    color: colors.secondary,
    opacity: 0.7
  },
  icon: {
    position: "absolute",
    right: 4,
    top: 25,
    color: colors.secondary
  }
});

export default TrackListItem;
