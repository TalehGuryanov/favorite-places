import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {AllPlaces} from "./screens/AllPlaces";
import {AddPlace} from "./screens/AddPlace";
import {GlobalStyles} from "./constants/styles";
import {IconButton} from "./components/ui/IconButton";
import {PlaceDetails} from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: GlobalStyles.colors.gray700,
            contentStyle: {backgroundColor: GlobalStyles.colors.white}
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({navigation}) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => {
                return (
                  <IconButton
                      name="add"
                      size={24}
                      color={tintColor}
                      onPress={() => navigation.navigate('AddPlace')}
                  />
                );
              }
            })}
          />
          <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              option={{
                title: 'Add a new Place',
              }}
          />
          <Stack.Screen
              option={{
                title: 'Place Details',
              }}
              name="PlaceDetails"
              component={PlaceDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({

});
