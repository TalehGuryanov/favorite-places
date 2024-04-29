import {
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';
import {Image, View, StyleSheet, Alert, Text} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {AppButton} from "../ui/AppButton";

export const PlaceImagePicker = ({onImagePick}) => {
  const [image, setImage] = useState(null);
  const [cameraPermissionStatus, requestCameraPermission] = useCameraPermissions();
  const [libraryPermissionStatus, requestLibraryPermission] = useMediaLibraryPermissions();
  
  const verifyCameraPermission = async () => {
    if( cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
     const permissionResponse= await requestCameraPermission();
     
     return permissionResponse.granted
    }
    
    if(cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions', 'Ypu need to grant camera permissions to use this app');
      
      return false;
    }
    
    return true;
  }
  
  const verifyLibraryPermission = async () => {
    if( libraryPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestLibraryPermission();
      
      return permissionResponse.granted
    }
    
    if(libraryPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions', 'Ypu need to grant library permissions to use this app');
      
      return false;
    }
    
    return true;
  }
  
  const takeImageHandler = async () => {
    const hasPermissions = await verifyCameraPermission();
    
    if(!hasPermissions) {
      return;
    }
    
   const image = await launchCameraAsync({
     quality: 0.5,
   });
    
    if(!image.canceled) {
      setImage(image.assets[0]);
      onImagePick('image', image.assets[0].uri)
    }
  };
  
  const libraryHandler = async () => {
    const hasPermissions = await verifyLibraryPermission();
    
    if(!hasPermissions) {
      return;
    }
    
    const image = await launchImageLibraryAsync();
    
    if(!image.canceled) {
      setImage(image.assets[0]);
      onImagePick('image', image.assets[0].uri);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.imageWr}>
        {!image && <Text>No image picked yet.</Text>}
        {image && <Image source={{ uri: image.uri }} style={styles.image} />}
      </View>
      
      <View style={styles.buttons}>
        {image ?
            <AppButton
                children="Remove image"
                onPress={() => setImage(null)}
                style={styles.button}
            />
            :
            <>
              <AppButton
                  children="Take image"
                  onPress={takeImageHandler}
                  style={styles.button}
              />
              
              <AppButton
                  children="Choose from library"
                  onPress={libraryHandler}
                  style={styles.button}
              />
            </>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWr: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: GlobalStyles.colors.primary100,
    overflow: "hidden",
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    alignItems: "center",
  },
  button: {
    flex: 1,
  }
});