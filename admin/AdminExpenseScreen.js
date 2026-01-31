import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

export default function ExpenseApp() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("expense"); // income | expense

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const addTransaction = () => {
    if (!amount || !title) return;

    setTransactions([
      {
        id: Date.now().toString(),
        title,
        amount: Number(amount),
        type,
      },
      ...transactions,
    ]);

    setAmount("");
    setTitle("");
  };

  return (
    <View style={styles.container}>
        {/* HEADER */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.headerTitle}>Expenses History</Text>
                  <Text style={styles.headerSubtitle}>
                    Manage expenses easily
                  </Text>
                </View>
                
              </View>
      {/* Balance Card */}
      <View style={styles.card}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balance}>${balance.toFixed(2)}</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Income</Text>
            <Text style={styles.income}>+${income}</Text>
          </View>
          <View>
            <Text style={styles.label}>Expense</Text>
            <Text style={styles.expense}>-${expense}</Text>
          </View>
        </View>
      </View>

      {/* Add Transaction */}
      <View style={styles.addBox}>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Amount"
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "income" && styles.activeIncome,
            ]}
            onPress={() => setType("income")}
          >
            <Text>Income</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeBtn,
              type === "expense" && styles.activeExpense,
            ]}
            onPress={() => setType("expense")}
          >
            <Text>Expense</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={addTransaction}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Add Transaction
          </Text>
        </TouchableOpacity>
      </View>

      {/* Transactions */}
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text
              style={{
                color: item.type === "income" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {item.type === "income" ? "+" : "-"}${item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
    paddingHorizontal: 20,
  },
  header: {

        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },
    headerSubtitle: {
        color: "#777",
        fontSize: 12,
        marginTop: 4,
    },
  card: {
    backgroundColor: "#4b1fa6",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  balanceTitle: {
    color: "#ddd",
    fontSize: 14,
  },
  balance: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: { color: "#ddd" },
  income: { color: "#4cff4c", fontWeight: "bold" },
  expense: { color: "#ff6b6b", fontWeight: "bold" },

  addBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  typeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  typeBtn: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#eee",
  },
  activeIncome: { backgroundColor: "#c8f7c5" },
  activeExpense: { backgroundColor: "#ffd6d6" },

  addBtn: {
    backgroundColor: "#4b1fa6",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  transaction: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});






