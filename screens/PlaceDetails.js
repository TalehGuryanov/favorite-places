import {ScrollView, View, Text, StyleSheet} from "react-native";
import {AppButton} from "../components/ui/AppButton";
import {GlobalStyles} from "../constants/styles";
import {useEffect} from "react";

export const PlaceDetails = ({route}) => {
  const selectedPlaceId = route.params.placeId;
  useEffect(() => {
  
  }, [route, selectedPlaceId]);
  
  const showOnMapHandler = () => {
  
  }
  
  return (
      <ScrollView>
        <Image style={styles.image}/>
        <View style={styles.container}>
          <View style={styles.addressWr}>
            <Text style={styles.address}>Address</Text>
          </View>
          <AppButton icon="map" onPress={showOnMapHandler}>View on map</AppButton>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%'
  },
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  addressWr: {
    padding: 20
  },
  address: {
    color: GlobalStyles.colors.primary500,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700"
  }
})