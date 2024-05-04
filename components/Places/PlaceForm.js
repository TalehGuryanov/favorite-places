import {ScrollView, View, Text, TextInput, StyleSheet} from "react-native";
import {useCallback, useState} from "react";

import {GlobalStyles} from "../../constants/styles";
import {PlaceImagePicker} from "./PlaceImagePicker";
import {LocationPicker} from "./LocationPicker";
import {AppButton} from "../ui/AppButton";
import {useDispatch, useSelector} from "react-redux";
import {addPlace} from "../../store/placesReducer";
import {useNavigation} from "@react-navigation/native";

export const PlaceForm = () => {
  const {location} = useSelector(state => state.places);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    location: '',
    id: ''
  });
  const navigation = useNavigation();
  
  const updateFormData = useCallback((inputName, value) => {
    setFormData((prevState) => {
     return  {...prevState, [inputName]: value}
    });
  } ,[setFormData])
  
  const savePlaceHandler = () => {
    updateFormData('location', location);
    updateFormData('id', new Date().toString() + Math.random().toString());
    dispatch(addPlace(formData));
    navigation.navigate('AllPlaces')
  }
  
  return (
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
              style={styles.input}
              onChangeText={(value) => updateFormData('title', value)}
              value={formData.title}
          />
        </View>
        <PlaceImagePicker onImagePick={updateFormData} />
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