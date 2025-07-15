import express from "express";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";

const router = express.Router();

router.get("/get", getExpenses);
router.post("/add", addExpense);
router.put("/update/:id", updateExpense);  // ✅ New Route for Updating Expenses
router.delete("/del/:id", deleteExpense);

export default router;
