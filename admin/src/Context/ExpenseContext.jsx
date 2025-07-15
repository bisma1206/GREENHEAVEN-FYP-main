// Context for Expenses
import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ExpenseContext = createContext();

const backendUrl = "http://localhost:5000"; // ✅ Ensure correct backend URL

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "GET_EXPENSES":
      return {
        ...state,
        transactions: Array.isArray(action.payload) ? action.payload : [],
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        transactions: state.transactions.filter(
          (exp) => exp._id !== action.payload
        ),
      };
    default:
      return state;
  }
};


const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, { transactions: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/expenses/get`);
      dispatch({ type: "GET_EXPENSES", payload: res.data || [] });
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      expense.type = expense.type.toLowerCase(); // ✅ Ensure proper casing
      const res = await axios.post(`${backendUrl}/api/expenses/add`, expense, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "ADD_EXPENSE", payload: res.data });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const updateExpense = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${backendUrl}/api/expenses/update/${id}`,
        updatedData
      );
      dispatch({ type: "UPDATE_EXPENSE", payload: res.data.expense });
      fetchExpenses();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/expenses/del/${id}`);
      dispatch({ type: "DELETE_EXPENSE", payload: id });
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  

  const calculateIncome = () => {
    return state.transactions
      .filter((item) => item.type === "income")
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);
  };

  const calculateExpense = () => {
    return state.transactions
      .filter((item) => item.type === "expense")
      .reduce((acc, item) => acc + Math.abs(item.amount), 0)
      .toFixed(2);
  };

  const calculateRevenue = () => {
    const income = parseFloat(calculateIncome());
    const expense = parseFloat(calculateExpense());
    return (income - expense).toFixed(2);
  };

  const calculateEarned = () => {
    return state.transactions
      .filter((item) => item.type === "earned")
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);
  };

  return (
    <ExpenseContext.Provider
      value={{
        transactions: state.transactions,
        fetchExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        loading,
        earned : calculateEarned(),
        expense : calculateExpense(),
        income : calculateIncome(),
        revenue : calculateRevenue(),
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

ExpenseProvider.propTypes = { children: PropTypes.node.isRequired };

export {ExpenseContext, ExpenseProvider};
