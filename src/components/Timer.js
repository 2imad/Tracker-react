import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import { colors, fonts } from "../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sanitizeKms } from "../config/helpers";
import { Stopwatch } from "react-native-stopwatch-timer";

const Timer = () => {
  const {
    state: { distance, recording, timerClear },
    saveTime
  } = useContext(LocationContext);
  let [currentTime, setCurrentTime] = useState(0);
  let [isStopwatchStart, setIsStopwatchStart] = useState(false);
  let [resetStopwatch, setResetStopwatch] = useState(false);

  const getFormattedTime = time => {
    setCurrentTime(time);
  };

  const saveCurrentTime = () => {
    saveTime(currentTime);
  };
  useEffect(() => {
    const clearTimer = () => {
      if (timerClear) {
        saveCurrentTime();
        setResetStopwatch(true);
      }
    };
    const _startStopWatch = () => {
      if (recording) {
        setIsStopwatchStart(!isStopwatchStart);
        setResetStopwatch(false);
      } else {
        setIsStopwatchStart(false);
      }
    };
    _startStopWatch();
    clearTimer();
  }, [recording, timerClear]);
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
          <Stopwatch
            start={isStopwatchStart}
            reset={resetStopwatch}
            getTime={getFormattedTime}
            options={options}
          />
        </View>
      </View>
    </>
  );
};

const options = {
  container: {
    backgroundColor: "inherit"
  },
  text: {
    fontSize: fonts.md,
    fontFamily: fonts.primary,
    color: colors.secondary
  }
};

const styles = StyleSheet.create({
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
