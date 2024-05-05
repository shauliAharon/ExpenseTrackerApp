import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import PrimaryButton from "../UI/PrimaryButton";
import { getFormattedDate } from "../../unit/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseFrom({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      // date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function SubmitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateValid || !descriptionIsValid) {
      //   Alert.alert("Invalid input", "please check your input values ");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const fromIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label="Amount"
            invalid={!inputs.amount.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "amount"),
              value: inputs.amount.value,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Date"
            invalid={!inputs.date.isValid}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
              value: inputs.date.value,
            }}
          />
        </View>
        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            // autoCapitalize: "none",
            // autoCorrect: false,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
        {fromIsInvalid && (
          <Text style={styles.errorText}>
            Invalid input values - please - please check your entered data!
          </Text>
        )}
        <View style={styles.buttens}>
          <PrimaryButton style={styles.butten} mode="flat" onPress={onCancel}>
            Cancel
          </PrimaryButton>
          <PrimaryButton style={styles.butten} onPress={SubmitHandler}>
            {submitButtonLabel}
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
}
export default ExpenseFrom;
const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.error500,
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
