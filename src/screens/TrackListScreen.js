import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../context/TrackContext';

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },

]


const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);
  return (
    <>
      <NavigationEvents onWillFocus={fetchTracks} />
      {
        list.map((l, i) => (
          <ListItem
            style={styles.content}
            key={i}
            leftAvatar={{ source: { uri: l.avatar_url } }}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
            chevron
          />
        ))
      }


      {/* <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })} >
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
            />
          </TouchableOpacity>
        }}
      /> */}
    </>
  );
};
const styles = StyleSheet.create({
  content: {
    fontFamily: 'Montserrat'
  }
});
export default TrackListScreen;
