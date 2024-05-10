import {ScrollView, View, Text, TextInput, StyleSheet} from "react-native";
import {useState} from "react";

import {GlobalStyles} from "../../constants/styles";
import {PlaceImagePicker} from "./PlaceImagePicker";
import {LocationPicker} from "./LocationPicker";
import {AppButton} from "../ui/AppButton";
import {useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {insertPlace} from "../../util/database";
import {useSQLiteContext} from "expo-sqlite";

export const PlaceForm = () => {
  const db = useSQLiteContext();
  const {location} = useSelector(state => state.places);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const navigation = useNavigation();
  
  const imagePickerHandler = (uri) => setImage(uri)
  
  
  const savePlaceHandler = async () => {
    const {address, latitude, longitude} = location;
    const payload = {
      address,
      title,
      imageUri: image,
      lat: latitude,
      lng: longitude
    };
    try {
      await insertPlace(db, payload)
      navigation.navigate('AllPlaces');
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
              style={styles.input}
              onChangeText={(value) => setTitle(value)}
              value={title}
          />
        </View>
        <PlaceImagePicker onImagePick={imagePickerHandler} />
        <LocationPicker />
        <AppButton onPress={savePlaceHandler} style={styles.button}>
          Add Place
        </AppButton>
      </ScrollView>
  )
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 700,
    marginBottom: 4,
    color: GlobalStyles.colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: GlobalStyles.colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalStyles.colors.primary100
  },
  button: {
    marginTop: 8,
  }
})