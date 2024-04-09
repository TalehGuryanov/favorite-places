import {FlatList, Text, StyleSheet, View} from "react-native";
import {PlaceItem} from "./PlaceItem";

export const PlacesList = ({places}) => {
  if(!places || !places.length) {
    return <View style={styles.fallbackContainer}>
      <Text tyle={styles.fallbackText}>No Places Yet</Text>
    </View>
  }
  return (
      <FlatList
          data={places}
          renderItem={({item}) => <PlaceItem place={item}/>}
          keyExtractor={item => item.id}
      />
  )
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 16
  }
})