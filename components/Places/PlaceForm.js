import {ScrollView, View, Text, TextInput, StyleSheet} from "react-native";
import {useState} from "react";

import {GlobalStyles} from "../../constants/styles";
import {PlaceImagePicker} from "./PlaceImagePicker";
import {LocationPicker} from "./LocationPicker";

export const PlaceForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    address: ''
  });
  const updateFormData = (inputName, value) => {
    setFormData((prevState) => {
     return  {...prevState, [inputName]: value}
    });
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
        <PlaceImagePicker/>
        <LocationPicker/>
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
  }
})