import React, { useContext } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";

const TrackDetailScreen = ({ navigation }) => {
  const {
    state: { tracks }
  } = useContext(TrackContext);
  const _id = navigation.getParam("_id");
  const track = tracks.find(t => t._id === _id);
  const snap = track.snapShot;
  return (
    <View>
      <Text> {track.name} </Text>
      <Image style={styles.previewImage} source={{ uri: snap }} />
    </View>
  );
};
const styles = StyleSheet.create({
  previewImage: {
    height: 200,
    backgroundColor: "black"
  },
  map: {
    height: 300
  }
});
export default TrackDetailScreen;
