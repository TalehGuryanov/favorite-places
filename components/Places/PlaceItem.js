import {Pressable, Image, View, Text, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

export const PlaceItem = ({place, onSelect}) => {
  return (
      <Pressable
          onPress={onSelect}
          style={({pressed}) => [styles.item, pressed && styles.pressed]}
      >
        {place.imageUri && <Image source={{uri: place.imageUri}} style={styles.image}/>}
        
        <View style={styles.info}>
          <Text style={styles.title}>
            {place.title}
          </Text>
          
          <Text style={styles.address}>
            {place.address}
          </Text>
        </View>
      </Pressable>
  )
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 12,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    flex: 1,
    height: 100
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 700,
    fontSize: 18,
    color: GlobalStyles.colors.gray700
  },
  address: {
    fontSize: 12,
    color: GlobalStyles.colors.gray700
  }
})