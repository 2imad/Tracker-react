import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, padding, margin, fonts } from "../styles/base";

const ScrollViewItem = ({ header, bodyItems, last }) => {
  return (
    <View style={styles.scrollItemContainer}>
      <Text style={styles.scrollItemHeader}>{header}</Text>
      {bodyItems.map((item, i) => (
        <Text key={i} style={styles.scrollItemBody}>
          {item}
        </Text>
      ))}
      <Text style={styles.scrollItemBodyLast}> {last}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollItemContainer: {
    flex: 1,
    borderBottomWidth: 0.3,

    borderColor: colors.tertiary
  },
  scrollItemHeader: {
    paddingVertical: padding.lg,
    marginTop: margin.md,
    marginLeft: margin.md,
    fontFamily: fonts.bold,
    fontSize: fonts.md,
    opacity: 0.6
  },
  scrollItemBody: {
    fontFamily: fonts.primary,
    marginLeft: margin.md,
    marginBottom: margin.md
  },
  scrollItemBodyLast: {
    fontFamily: fonts.bold,
    marginLeft: margin.md,
    marginBottom: margin.md,
    color: colors.tertiary
  }
});

export default ScrollViewItem;
