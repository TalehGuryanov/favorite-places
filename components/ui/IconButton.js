import {Ionicons} from "@expo/vector-icons";
import {Pressable, View, StyleSheet} from "react-native";

export const IconButton = ({name, size, color, style, onPress}) => {
  return (
      <Pressable
          style={({pressed}) => pressed && styles.pressed}
          onPress={onPress}
      >
        <View style={styles.container}>
          <Ionicons
              name={name}
              size={size}
              color={color}
              style={style}
          />
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.75,
  }
})