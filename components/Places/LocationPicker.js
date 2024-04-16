import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from "expo-location";
import {useState, useEffect} from "react";
import {View, StyleSheet, Alert, Text, Image} from "react-native";
import {AppButton} from "../ui/AppButton";
import {GlobalStyles} from "../../constants/styles";
import {getMapPreview} from "../../util/location";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {useNavigation, useRoute} from "@react-navigation/native";

export const LocationPicker = () => {
  const navigate = useNavigation();
  const route = useRoute();
  const [locationPermissionStatus, requestLocationPermission] = useForegroundPermissions();
  const [picketLocation, setPicketLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if(route.params) {
      const mapPickedLocation =  {lat: route.params.pickedLocation.latitude, lng: route.params.pickedLocation.longitude};
      
      setPicketLocation(mapPickedLocation);
    }
  }, [route.params]);
  
  const verifyLocationPermission = async () => {
    if( locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestLocationPermission();
      
      return permissionResponse.granted
    }
    
    if(locationPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions', 'You need to grant location permissions to use this app');
      
      return false;
    }
    
    return true;
  }
  
  const getLocationHandler = async () => {
    setIsLoading(true);
    const hasPermissions = await verifyLocationPermission();
    
    if(!hasPermissions) {
      return;
    }
    
    const location = await getCurrentPositionAsync();
    setPicketLocation({lat: location.coords.latitude, lng: location.coords.longitude});
    setIsLoading(false);
  }
  
  const pickOnMapHandler = () => {
    navigate.navigate('Map');
  }
  
  const mapOverview = () => {
    if(isLoading) {
      return <LoadingOverlay/>
    }
    
    if(!picketLocation) {
      return <Text>No location picked yet.</Text>
    }
    
    return  <Image style={styles.image} source={{uri: getMapPreview(picketLocation.lat, picketLocation.lng)}}/>
  }
  
  return (
    <View>
      <View style={styles.mapPreview}>
        {mapOverview()}
      </View>
      <View style={styles.buttons}>
        {!isLoading &&
          <>
            <AppButton
              children="Get User Location"
              onPress={getLocationHandler}
              style={styles.button}
            />
            <AppButton
              children="Pick on Map"
              onPress={pickOnMapHandler}
              style={styles.button}
            />
          </>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    overflow: 'hidden'
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
  },
  button: {
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
})