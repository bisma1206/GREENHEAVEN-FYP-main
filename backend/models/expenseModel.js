import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    text: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense", "earned"], required: true }, // ✅ Added "earned"
    date: { type: Date, default: Date.now }
});

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
