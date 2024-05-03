import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import ExpensesItem from "./ExpensesItem";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A pair of shoessA pair of shoesA pair of shoes",
//     amount: 555555.96,
//     date: new Date("2024-12-19"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.99,
//     date: new Date("2024-12-12"),
//   },
//   {
//     id: "e3",
//     description: "A pair of bananas",
//     amount: 5.99,
//     date: new Date("2024-12-01"),
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 15.99,
//     date: new Date("2024-02-01"),
//   },
//   {
//     id: "e5",
//     description: "A phone",
//     amount: 155.99,
//     date: new Date("2024-01-01"),
//   },
//   {
//     id: "e6",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2024-12-19"),
//   },
//   {
//     id: "e7",
//     description: "A pair of trousers",
//     amount: 89.99,
//     date: new Date("2024-12-12"),
//   },
//   {
//     id: "e8",
//     description: "A pair of bananas",
//     amount: 5.99,
//     date: new Date("2024-12-01"),
//   },
//   {
//     id: "e9",
//     description: "A book",
//     amount: 15.99,
//     date: new Date("2024-02-01"),
//   },
//   {
//     id: "e10",
//     description: "A phone",
//     amount: 56.99,
//     date: new Date("2024-01-01"),
//   },
// ];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}
export default ExpensesOutput;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
