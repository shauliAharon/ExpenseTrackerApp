import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import PrimaryButton from "../components/UI/PrimaryButton";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseFrom from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const exprenseCtx = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = exprenseCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

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
  function confirmExpenseHandler(expenseData) {
    if (isEditing) {
      exprenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      exprenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseFrom
        onSubmit={confirmExpenseHandler}
        onCancel={cancelExpenseHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

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
});
