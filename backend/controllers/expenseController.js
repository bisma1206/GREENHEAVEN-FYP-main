import Expense from "../models/expenseModel.js";

// Fetch all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses.length ? expenses : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new expense (Fix: Ensure type is saved correctly)
export const addExpense = async (req, res) => {
  try {
    const { text, amount, type } = req.body;

    // Validate required fields
    if (!text || !amount || !type) {
      return res.status(400).json({ success: false, message: "All fields (text, amount, type) are required." });
    }

    // Ensure amount is a valid number
    if (typeof amount !== "number" || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Amount must be a valid number." });
    }

    // Allow "earned" type in addition to "income" and "expense"
    if (!["income", "expense", "earned"].includes(type.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid type. Use 'income', 'expense', or 'earned'." });
    }

    const expense = new Expense({
      text,
      amount: Number(amount),
      type: type.toLowerCase(), // ✅ Normalize type
    });

    await expense.save();
    res.status(201).json({ success: true, expense });

  } catch (err) {
    console.error("Error Adding Expense:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Update Expense (New Feature)
export const updateExpense = async (req, res) => {
  try {
    const { text, amount, type } = req.body;
    const { id } = req.params;

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { text, amount: Number(amount), type },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.json({
      success: true,
      message: "Expense updated successfully!",
      expense: updatedExpense,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Expense deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
