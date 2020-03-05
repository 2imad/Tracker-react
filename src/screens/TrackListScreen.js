import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { Avatar, Text, Badge } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as ProfileContext } from "../context/ProfileContext";
import hiker from "../../assets/images/hiker.jpg";
import { centerItems } from "../styles/layout";
import { fonts, colors, margin, padding } from "../styles/base";
import TrackListItem from "../components/TrackListItem";
import Loader from "../components/Loader";
const TrackListScreen = ({ navigation }) => {
  const {
    state: { tracks, isFetching },
    fetchTracks
  } = useContext(TrackContext);
  const {
    state: { profile, image },
    getProfileName,
    getProfilePhoto
  } = useContext(ProfileContext);
  return (
    <>
      <SafeAreaView
        style={{ backgroundColor: colors.primaryBgColor }}
        forceInset={{ top: "always" }}
      ></SafeAreaView>
      <NavigationEvents
        onWillFocus={() => {
          getProfileName();
          getProfilePhoto();
        }}
        onDidFocus={fetchTracks}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarInnerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Account")}>
              <Avatar
                source={{
                  uri: image || null
                }}
                size={70}
                rounded
                title="TR"
                showEditButton
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.header}> {profile} </Text>
          <View style={styles.rankingContainer}>
            <Text style={styles.ranking}>Rank</Text>
            <Badge value="2" />
          </View>
        </View>
      </View>
      <View style={styles.ListContainer}>
        {isFetching && !tracks.length ? (
          <Loader />
        ) : !tracks.length ? (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}> Add my first Track!</Text>
            <View style={styles.iconContainer}>
              <FontAwesome
                onPress={() => navigation.navigate("TrackCreate")}
                color={colors.primary}
                name="plus"
                size={40}
              />
            </View>
          </View>
        ) : (
          <FlatList
            data={tracks}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("TrackDetail", { _id: item._id })
                  }
                >
                  <TrackListItem
                    title={item.name}
                    distance={item.distance}
                    timeElapsed={item.timeElapsed}
                  />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

TrackListScreen.navigationOptions = {
  header: null
};
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primaryBgColor,
    flexDirection: "row-reverse",
    height: 100,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderColor: colors.secondary
  },
  avatarContainer: {
    paddingHorizontal: padding.sm,
    ...centerItems
  },
  avatarInnerContainer: {
    height: 85,
    width: 85,
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
    fontFamily: fonts.bold,
    fontSize: fonts.lg,
    textAlign: "right",
    color: colors.primary
  },
  rankingContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  ranking: {
    fontFamily: fonts.primary,
    marginRight: 5,
    color: colors.secondary
  },
  listItemContainer: {
    borderBottomWidth: 2,
    borderColor: colors.primary
  },
  ListContainer: {
    flex: 1,
    backgroundColor: colors.primaryBgColor
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    padding: padding.md
  },
  emptyListText: {
    fontFamily: fonts.primary,
    fontSize: fonts.md,
    color: colors.secondary
  },
  content: {
    fontFamily: "Montserrat",
    fontSize: 20,
    fontWeight: "700"
  }
});
export default TrackListScreen;
