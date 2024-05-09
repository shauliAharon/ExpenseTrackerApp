import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fechExpenses } from "../unit/http";

function AllExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fechExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <ExpensesOutput
        expenses={expensesCtx.expenses}
        expensesPeriod="Total"
        fallbackText="No registered expenses found"
      />
    </>
  );
}
export default AllExpenses;
const styles = StyleSheet.create({});
