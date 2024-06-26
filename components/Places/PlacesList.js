import {FlatList, Text, StyleSheet, View} from "react-native";
import {PlaceItem} from "./PlaceItem";
import {useSelector} from "react-redux";

export const PlacesList = () => {
  const {places} = useSelector(state => state.places);
  
  if(!places || !places.length) {
    return <View style={styles.fallbackContainer}>
      <Text tyle={styles.fallbackText}>No Places Yet</Text>
    </View>
  }
  return (
      <FlatList
          style={styles.list}
          data={places}
          renderItem={({item}) => <PlaceItem place={item}/>}
          keyExtractor={item => item.id}
      />
  )
};

const styles = StyleSheet.create({
  list: {
    margin: 24
  },
  fallbackContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 16
  }
})