import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <>
      <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" />
    </>
  );
}
export default AllExpenses;
const styles = StyleSheet.create({});
