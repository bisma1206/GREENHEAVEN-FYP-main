import { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

export default function IncomeExpenses() {
  const {
    transactions, income, expense, earned
  } = useContext(ExpenseContext);

  if (!transactions || !Array.isArray(transactions)) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        Loading...
      </div>
    );
  }

  

  return (
    <div className="flex justify-between shadow-md p-6 rounded-lg">
      <div className="text-center">
        <h4 className="text-gray-900 text-lg font-bold">Income</h4>
        <p className="text-green-700 text-2xl font-semibold">${income}</p>
      </div>
      <div className="border-l border-green-800 mx-6"></div>
      <div className="text-center">
        <h4 className="text-green-700 text-lg font-bold">Expense</h4>
        <p className="text-red-800 text-2xl font-semibold">${expense}</p>
      </div>
      <div className="border-l border-green-800 mx-6"></div>
      <div className="text-center">
        <h4 className="text-blue-700 text-lg font-bold">Earned</h4>
        <p className="text-blue-500 text-2xl font-semibold">${earned}</p>
      </div>
    </div>
  );
}
