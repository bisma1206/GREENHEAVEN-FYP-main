import { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import Transaction from "./Transaction";

export default function TransactionList() {
  const { transactions, loading } = useContext(ExpenseContext);

  if (loading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg text-center">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold mb-4">Transaction History</h3>
      <ul className="divide-y divide-gray-200">
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((transaction, index) => (
              <Transaction
                key={transaction._id || index}
                transaction={transaction}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-800 text-center py-2">
            No transactions found.
          </p>
        )}
      </ul>
    </div>
  );
}
