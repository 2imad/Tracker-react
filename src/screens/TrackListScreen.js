import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { ListItem, Card, Image, Text } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import hikeAsset from '../../assets/images/hike.png'


const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  return (
    <>
      <SafeAreaView forceInset={{ top: 'always' }}></SafeAreaView>
      <NavigationEvents onWillFocus={fetchTracks} />
      <Card
        containerStyle={styles.container}
        title='TRACKS'
        titleStyle={styles.content}
      >
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })} >
              <ListItem
                leftAvatar={{ source: hikeAsset }}
                title={item.name}
                titleStyle={styles.content}
                subtitle={item.name}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          }}
        />
      </Card>
    </>
  );

};

TrackListScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {

  },
  img: {
    aspectRatio: 1
  },
  content: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    fontWeight: '700'
  }
});
export default TrackListScreen;
