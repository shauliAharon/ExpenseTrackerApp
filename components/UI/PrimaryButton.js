import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function PrimaryButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.ButtonContainer, mode === "flat" && styles.Flat]}>
          <Text style={[styles.butttonText, mode === "flat" && styles.Flat]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
export default PrimaryButton;
const styles = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  Flat: {
    backgroundColor: "transparent",
  },
  butttonText: {
    color: "white",
    textAlign: "center",
  },
  fletText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});
