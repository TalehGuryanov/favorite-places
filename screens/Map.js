import {View, StyleSheet, Alert} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import {useState, useLayoutEffect, useEffect, useCallback} from "react";
import {IconButton} from "../components/ui/IconButton";
import {useForegroundPermissions} from "expo-location";
import {LoadingOverlay} from "../components/ui/LoadingOverlay";
import {useDispatch, useSelector} from "react-redux";
import {addLocation} from "../store/placesReducer";
import {getAddress, getUserLocation} from "../util/location";

export const Map = ({navigation}) => {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.places);
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermissionStatus, requestLocationPermission] = useForegroundPermissions();
  
  useEffect(() => {
    if(!location.latitude || !location.longitude) {
      (async () => {
        setIsLoading(true);
        
        const locationPayload = await getUserLocation(locationPermissionStatus, requestLocationPermission);
        
        dispatch(addLocation(locationPayload))
        setIsLoading(false);
      })();
    }
  }, [dispatch, location]);
  
  const selectLocationHandler = async (event) => {
    const locationCoords = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude
    };
    const address = await getAddress(locationCoords.latitude, locationCoords.longitude);
    const locationPayload = {
      latitude: locationCoords.latitude,
      longitude: locationCoords.longitude,
      address
    }
    
    dispatch(addLocation(locationPayload))
  }
  
  const savePickedLocationHandler = useCallback(() => {
    if (!location.latitude || !location.longitude) {
      Alert.alert("No location picked", "Please pick a location on the map");
      return;
    }
    
    navigation.navigate("AddPlace");
  }, [location, navigation]);
  
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
        {isLoading ?
            <LoadingOverlay/> :
            <MapView
                style={styles.map}
                initialRegion={location}
                onPress={selectLocationHandler}
            >
              {location.longitude && location.latitude && (
                  <Marker
                      title="Picked Location"
                      coordinate={{
                          latitude: location.latitude,
                          longitude: location.longitude
                      }}
                  />
              )}
            </MapView>
        }
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