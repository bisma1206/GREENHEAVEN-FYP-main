import PropTypes from "prop-types";
import { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

export default function Transaction({ transaction }) {
  const { deleteTransaction } = useContext(ExpenseContext);
  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      className={`flex justify-between items-center p-4 rounded-lg shadow-md ${
        transaction.amount < 0 ? "bg-red-100" : "bg-green-100"
      }`}
    >
      <span className="text-gray-700 font-semibold">{transaction.text}</span>
      <span
        className={`text-lg font-bold ${
          transaction.amount < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        onClick={() => deleteTransaction(transaction.id)}
      >
        x
      </button>
    </li>
  );
}

// Prop Validation
Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};
