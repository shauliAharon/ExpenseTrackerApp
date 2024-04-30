import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../unit/date";

function ExpensesItem({ description, amount, date }) {
  return (
    <Pressable>
      <View style={styles.expenseItem}>
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amounr}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
export default ExpensesItem;
const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,

  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  descriptionContainer: {
    width: "70%",
    // margin: 2,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    margin: 1,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: 102,
    height: 45,
  },
  amounr: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
