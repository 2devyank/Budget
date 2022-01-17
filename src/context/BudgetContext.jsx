import React, { createContext, useContext, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import useLocalStorage from "../Hooks/UselocalStorage";

const BudgetContext = createContext();

export function useBudgets() {
    return useContext(BudgetContext);
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setbudgets] = useLocalStorage("budgets",[])

    const [expenses, setexpenses] = useLocalStorage("expenses",[])

    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId);
    }


    function addExpense({ description, amount, budgetId }) {
        setexpenses(prevexpenses => {
            return [...prevexpenses, { id: uuidV4(), description, amount, budgetId }]
        })
    }


    function addBudget({ name, max }) {

        setbudgets(prevbudgets => {
            if (prevbudgets.find(budget => budget.name === name)) {
                return prevbudgets
            }
            return [...prevbudgets, { id: uuidV4(), name, max }]
        })
    }
    function deleteBudget({ id }) {
        setbudgets(prevbudgets => {
            return prevbudgets.filter(budget => budget.id !== id)
        })
    }
    function deleteExpense({ id }) {
        setexpenses(prevexpenses => {
            return prevexpenses.filter(expense => expense.id !== id)
        })
    }



    return (
        <BudgetContext.Provider value={{

            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>
            {children}
        </BudgetContext.Provider>
    )
}