import {Pressable, Image, View, Text, StyleSheet} from "react-native";

export const PlaceItem = ({place, onSelect}) => {
  return (
      <Pressable onPress={onSelect}>
        <Image source={{uri: place.image}}/>
        <View>
          <Text>{place.title}</Text>
          <Text>{place.address}</Text>
        </View>
      </Pressable>
  )
};

const styles = StyleSheet.create({

})