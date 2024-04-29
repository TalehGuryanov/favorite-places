import {getCurrentPositionAsync, PermissionStatus} from "expo-location";
import {Alert} from "react-native";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;

export const getMapPreview = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:Place%7C${lat},${lng}
  &key=${GOOGLE_API_KEY}`
};

const verifyLocationPermission = async (locationPermissionStatus, requestLocationPermission) => {
  if(locationPermissionStatus && locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestLocationPermission();
    
    return permissionResponse.granted
  }
  
  if(locationPermissionStatus && locationPermissionStatus.status === PermissionStatus.DENIED) {
    Alert.alert('Insufficient permissions', 'You need to grant location permissions to use this app');
    
    return false;
  }
  
  return true;
}

export const getUserLocation = async (locationPermissionStatus, requestLocationPermission) => {
  const hasPermissions = await verifyLocationPermission(locationPermissionStatus, requestLocationPermission);
  
  if(!hasPermissions) {
    return;
  }
  
  const locationResponse = await getCurrentPositionAsync();
  
  return {
    latitude: locationResponse.coords.latitude,
    longitude: locationResponse.coords.longitude
  }
};

export const getAddress = async(lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  
  const response = await fetch(url);
  
  if(!response.ok) {
    throw new Error(response.statusText);
  }
  
  const data = await response.json();
  return data.results[0].formatted_address;
}