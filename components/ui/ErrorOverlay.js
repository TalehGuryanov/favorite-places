import {View, Text, StyleSheet} from 'react-native';
import {GlobalStyles} from "../../constants/styles";
import {AppButton} from "./AppButton";

export const ErrorOverlay = ({errorMessage, onConfirm}) => {
  return (
      <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An Error occurred!</Text>
        <Text style={styles.text}>{errorMessage}</Text>
        <AppButton onPress={onConfirm}>Try Again</AppButton>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: GlobalStyles.colors.white
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
})