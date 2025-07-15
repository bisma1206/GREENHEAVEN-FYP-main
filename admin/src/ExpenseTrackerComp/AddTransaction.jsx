import { useContext, useState } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

export default function AddTransaction() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const { addExpense } = useContext(ExpenseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() || isNaN(amount) || amount === "") {
      alert("Enter valid data");
      return;
    }

    const formattedAmount =
      type === "expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

    console.log("Submitting:", { text, amount: formattedAmount, type });

    await addExpense({ text, amount: formattedAmount, type });
  };

  return (
    <div className="p-6 shadow-md rounded-lg">
      <h1 className="text-lg text-green-800 font-extrabold mb-4">
        Register Transaction
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter transaction name..."
        />
        <input
          className="w-full p-2 border rounded"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
        />
        <select
          className="w-full p-2 border rounded bg-green-100 focus:ring-2 focus:ring-green-500"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-600">
          Record Transaction
        </button>
      </form>
    </div>
  );
}
