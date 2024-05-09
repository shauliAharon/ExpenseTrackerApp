import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import PrimaryButton from "./PrimaryButton";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
      <PrimaryButton onPress={onConfirm}>Okay</PrimaryButton>
    </View>
  );
}
export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: "center",
    marginBottom: 8,
    color:'white'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
