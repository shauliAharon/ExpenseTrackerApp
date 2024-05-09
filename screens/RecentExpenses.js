import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDaye } from "../unit/date";
import { fechExpenses } from "../unit/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [erroe, setErroe] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fechExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setErroe("Could not fetch expenses!");
      }

      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function erroreHandler() {
    setErroe(null);
  }

  if (erroe && !isFetching) {
    return <ErrorOverlay message={erroe} onConfirm={erroreHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDaye(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Date"
      fallbackText="No Expenses registered for the last 7 days"
    />
  );
}
export default RecentExpenses;

const styles = StyleSheet.create({});
