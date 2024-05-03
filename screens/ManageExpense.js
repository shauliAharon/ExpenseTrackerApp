import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import PrimaryButton from "../components/UI/PrimaryButton";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const exprenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }),
    [navigation, isEditing];

  function deleteExpenseHandler() {
    exprenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }
  function cancelExpenseHandler() {
    navigation.goBack();
    return console.log("cancel");
  }
  function confirmExpenseHandler() {
    if (isEditing) {
      exprenseCtx.updateExpense(editedExpenseId, {
        description: "test!!!!!",
        amount: 29.99,
        date: new Date("2024-12-01"),
      });
    } else {
      exprenseCtx.addExpense({
        description: "test",
        amount: 19.99,
        date: new Date("2024-05-01"),
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttens}>
        <PrimaryButton
          style={styles.butten}
          mode="flat"
          onPress={cancelExpenseHandler}
        >
          Cancel
        </PrimaryButton>
        <PrimaryButton style={styles.butten} onPress={confirmExpenseHandler}>
          {isEditing ? "Update" : "Add"}
        </PrimaryButton>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpense;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttens: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  butten: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
