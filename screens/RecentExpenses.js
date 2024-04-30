import { StyleSheet, Text } from "react-native";
import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";

function RecentExpenses() {
    return<ExpensesOutput expensesPeriod='Last 7 Date'/>
}
export default RecentExpenses;

const styles = StyleSheet.create({});
