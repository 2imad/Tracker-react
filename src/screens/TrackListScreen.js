import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { ListItem, Avatar, Text, Badge } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import hikeAsset from '../../assets/images/hike.png'
import { centerItems } from '../styles/layout';
import { fonts, colors, margin, padding } from '../styles/base';
import TrackListItem from "../components/TrackListItem";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.primaryBgColor }} forceInset={{ top: 'always' }}></SafeAreaView>
      <NavigationEvents onWillFocus={fetchTracks} />
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarInnerContainer} >
            <Avatar
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
              size={70} rounded title="MD"
              showEditButton
            />
          </View>
        </View>
        <View style={styles.textContainer} >
          <Text style={styles.header}> Imad Youssoufi </Text>
          <View style={styles.rankingContainer}>
            <Text style={styles.ranking}>Rank</Text>
            <Badge value="2" />
          </View>
        </View>
      </View>
      <View
        style={styles.ListContainer}
      >
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })} >
              <TrackListItem
                title={item.name}
                distance={item.distance}
              />
            </TouchableOpacity>
          }}
        />
      </View>
    </>
  );

};

TrackListScreen.navigationOptions = {
  header: null
}
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primaryBgColor,
    flexDirection: 'row-reverse',
    height: 100,
    paddingBottom: 5,
    borderBottomWidth: .5,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    fontSize: fonts.md,
    paddingHorizontal: padding.sm,
    ...centerItems
  },
  header: {
    fontFamily: fonts.primary,
    fontSize: fonts.md,
    textAlign: 'right',
    color: colors.primary
  },
  rankingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
  content: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '700'
  }
});
export default TrackListScreen;
