import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { NavigationEvents } from 'react-navigation';
import { ListItem, Card, Image } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';
import hikeAsset from '../../assets/images/hike.png'


const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      <Card
        containerStyle={styles.container}
        title='TRACKS'
        titleStyle={styles.content}
        imageStyle={styles.img}
        image={require('../../assets/images/hike.jpeg')}>

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

TrackListScreen.navigationOpltions = {

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
