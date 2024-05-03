import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import { gatDateMinusDaye } from "../unit/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = gatDateMinusDaye(today, 7);
    return expense.date > date7DaysAgo;
  });
  return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Date" />;
}
export default RecentExpenses;

const styles = StyleSheet.create({});
