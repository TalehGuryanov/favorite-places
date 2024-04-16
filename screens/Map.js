import {View, StyleSheet, Alert} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import {useState, useLayoutEffect} from "react";
import {IconButton} from "../components/ui/IconButton";

export const Map = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const selectLocationHandler = (event) => {
    setSelectedLocation({
      ...selectedLocation,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    })
  }
  const savePickedLocationHandler = () => {
    if(!selectedLocation) {
      Alert.alert('No location picked', 'Please pick a location on the map');
      return null;
    }
    
    navigation.navigate('AddPlace', {pickedLocation: selectedLocation});
  }
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) =>
          <IconButton
              onPress={savePickedLocationHandler}
              name="save"
              color={tintColor}
              size={24}
          />
    }) 
  }, [navigation, savePickedLocationHandler]);
  
  return (
      <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={selectedLocation}
            onPress={selectLocationHandler}
        >
          {selectedLocation && (
              <Marker
                  title="Picked Location"
                  coordinate={{
                      latitude: selectedLocation.latitude,
                      longitude: selectedLocation.longitude
                  }}
              />
          )}
        </MapView>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});