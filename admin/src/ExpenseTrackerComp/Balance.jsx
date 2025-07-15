import { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

export default function Balance() {
  const { transactions } = useContext(ExpenseContext);

  const total = transactions.reduce((acc, item) => acc + item.amount, 0);

  // Format the total as a currency value
  const formattedTotal = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="p-6 shadow-md rounded-lg text-center">
      <h1 className="text-green-800 text-4xl font-extrabold mb-8">
        Financial Snapshot
      </h1>
      <h1
        className={`text-3xl font-bold ${
          total >= 0 ? "text-green-800" : "text-red-500"
        }`}
      >
        {formattedTotal}
      </h1>
    </div>
  );
}
