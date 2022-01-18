import React from 'react'
import { useBudgets } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'

export default function Total() {

const{budgets,expenses}=useBudgets()
const amount=expenses.reduce((total,expense)=>total+expense.amount,0)
const max=budgets.reduce((total,budget)=>total+budget.max,0)

if(max===0)return null;

    return (
      <BudgetCard  max={max} amount={amount} gray name="Total" hideButtons/>
            )
}
