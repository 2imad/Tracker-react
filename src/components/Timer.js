import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import { colors, fonts } from "../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sanitizeKms, getTime } from "../config/helpers";
import moment from "moment";

const Timer = () => {
  const {
    state: { distance, recording, timerClear },
    saveTime
  } = useContext(LocationContext);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }
  useEffect(() => {
    let interval = null;
    const startTimer = () => {
      if (isActive) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      }
    };
    if (recording) {
      setIsActive(true);
      startTimer();
    }

    return () => clearInterval(interval);
  }, [recording, isActive, seconds]);

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    if (timerClear) {
      reset();
    }
  });

  const renderTimer = interval => {
    const duration = moment.duration(interval);

    return `${duration.minutes()}:${duration.seconds()}`;
  };

  return (
    <>
      <View style={styles.distanceContainer}>
        <View style={styles.iconHolder}>
          <Text style={styles.textStyle}>
            <MaterialCommunityIcons
              name="run-fast"
              color={colors.orangeRed}
              size={40}
            />
          </Text>
          <Text style={styles.valueStyle}>{sanitizeKms(distance)}</Text>
        </View>
        <View style={styles.iconHolder}>
          <Text style={styles.textStyle}>
            <MaterialCommunityIcons
              name="timer"
              color={colors.orangeRed}
              size={40}
            />
          </Text>
          <Text style={styles.valueStyle}>{getTime(seconds)} s</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: colors.primaryBgColor,
    flex: 1
  },
  distanceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end"
  },
  iconHolder: {
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  valueStyle: {
    fontSize: fonts.md,
    color: colors.secondary,
    fontFamily: fonts.primary
  }
});

export default Timer;
