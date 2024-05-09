import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

import { ExpensesContext } from "../store/expenses-context";
import ExpenseFrom from "../components/ManageExpense/ExpenseForm";
import { deleteExpenses, storeExpense, updateExpense } from "../unit/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [erroe, setErroe] = useState();
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

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpenses(editedExpenseId);
      exprenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setErroe("Could not delete expenses - please try again later");
      setIsSubmitting(false);
    }
  }
  function cancelExpenseHandler() {
    navigation.goBack();
    return console.log("cancel");
  }
  async function confirmExpenseHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        exprenseCtx.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(true);
        const id = await storeExpense(expenseData);

        exprenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setErroe("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }
  function erroreHandler() {
    setErroe(null);
  }

  if (erroe && !isSubmitting) {
    return <ErrorOverlay message={erroe} onConfirm={erroreHandler} />;
  }
  if (isSubmitting) {
    return <LoadingOverlay />;
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
