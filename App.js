import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import {store} from './store/store';
import {AllPlaces} from "./screens/AllPlaces";
import {AddPlace} from "./screens/AddPlace";
import {GlobalStyles} from "./constants/styles";
import {IconButton} from "./components/ui/IconButton";
import {PlaceDetails} from "./screens/PlaceDetails";
import {Map} from "./screens/Map";
import {useEffect, useState} from "react";
import {initDatabase} from "./util/database";
import {LoadingOverlay} from "./components/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDbInit, setDbInit] = useState(false);
  
  useEffect(() => {
    initDatabase()
        .then(() => setDbInit(true))
        .catch(error => console.log(error));
    ;
  }, [])
  
  if(!isDbInit) {
    return <LoadingOverlay/>
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: GlobalStyles.colors.gray700,
            contentStyle: {backgroundColor: GlobalStyles.colors.primary800}
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
          <Stack.Screen
              option={{
                title: 'Map',
              }}
              name="Map"
              component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}
