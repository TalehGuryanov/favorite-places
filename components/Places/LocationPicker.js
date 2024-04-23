import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from "expo-location";
import {useState, useEffect, useCallback} from "react";
import {View, StyleSheet, Alert, Text, Image} from "react-native";
import {AppButton} from "../ui/AppButton";
import {GlobalStyles} from "../../constants/styles";
import {getMapPreview, getUserLocation} from "../../util/location";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {addLocation} from "../../store/placesReducer";

export const LocationPicker = () => {
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.places);
  const navigate = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [locationPermissionStatus, requestLocationPermission] = useForegroundPermissions();
  
  const getLocationHandler = useCallback(() => {
    (async() => {
      setIsLoading(true);
      const locationPayload = await getUserLocation(locationPermissionStatus, requestLocationPermission);
      
      dispatch(addLocation(locationPayload));
      setIsLoading(false);
    })();
  }, [location, dispatch])
  
  const pickOnMapHandler = () => {
    navigate.navigate('Map');
  }
  
  const mapOverview = () => {
    if(isLoading) {
      return <LoadingOverlay/>
    }
    
    if(!location || !location.latitude || !location.longitude) {
      return <Text>No location picked yet.</Text>
    }
    
    return  <Image style={styles.image} source={{uri: getMapPreview(location.latitude, location.longitude)}}/>
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