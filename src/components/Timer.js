import React, { useState, useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Context as LocationContext } from "../context/LocationContext";
import { colors, fonts } from "../styles/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sanitizeKms } from "../config/helpers";
import { getTime } from "../config/helpers";

const Timer = () => {
  const {
    state: { distance, recording, timerClear },
    saveTime
  } = useContext(LocationContext);
  let [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  let [time, setTime] = useState(0);

  useEffect(() => {
    const handleTimerStart = () => {
      const timeNow = Date.now() - timer;
      if (running) {
        clearInterval(time);
        setRunning(false);
      } else {
        setTime(
          (time = setInterval(() => {
            setTimer((timer = Date.now() - timeNow));
          }, 0))
        );
        setRunning(true);
      }
    };
    if (recording) {
      handleTimerStart();
    }
  });

  useEffect(() => {
    if (timerClear) {
      handleClear(timer);
    }
  }, [timerClear]);

  const handleClear = timer => {
    saveTime(timer);
    setRunning(false);
    setTimer(0);
    return;
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
          <Text style={styles.valueStyle}>{getTime(timer)}</Text>
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
