import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ExpenseContext } from "../Context/ExpenseContext";

export default function ProfitGraph() {
  const { transactions, loading } = useContext(ExpenseContext);

  if (loading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        Loading...
      </div>
    );
  }

  // Prepare chart data
  const chartData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!acc[date])
      acc[date] = {
        date,
        income: 0,
        expense: 0,
        earned: 0,
        profit: 0,
        loss: 0,
      };

    if (transaction.type === "income") acc[date].income += transaction.amount;
    else if (transaction.type === "expense")
      acc[date].expense += Math.abs(transaction.amount);
    else if (transaction.type === "earned")
      acc[date].earned += transaction.amount;

    const totalIncome = acc[date].income + acc[date].earned;
    if (totalIncome >= acc[date].expense) {
      acc[date].profit = totalIncome - acc[date].expense;
      acc[date].loss = 0;
    } else {
      acc[date].loss = acc[date].expense - totalIncome;
      acc[date].profit = 0;
    }

    return acc;
  }, {});

  return (
    <div className="p-6 shadow-md rounded-lg">
      <h3 className="text-4xl text-green-800 font-extrabold mb-4 text-center">
        Net Profit & Loss Analysis
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={Object.values(chartData)}>
          <XAxis dataKey="date" tick={{ fill: "#000000" }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="green" name="Income" />
          <Bar dataKey="expense" fill="#c04e4e" name="Expense" />
          <Bar dataKey="earned" fill="#0288d1" name="Earned" />
          <Bar dataKey="profit" fill="blue" name="Profit" />
          <Bar dataKey="loss" fill="#c62828" name="Loss" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
