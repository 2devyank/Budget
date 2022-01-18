import React, { useRef } from 'react'
import { Button, Form, Modal, Stack } from 'react-bootstrap'
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from '../context/BudgetContext'
import { currencyFormatter } from './Utils'

export default function View({budgetId,handleClose}) {

    const { deleteBudget, deleteExpense,getBudgetExpenses,budgets}=useBudgets()
    const expenses=getBudgetExpenses(budgetId)
    const budget=UNCATEGORIZED_BUDGET_ID===budgetId
    ?{name:"uncategorized",id:UNCATEGORIZED_BUDGET_ID}:
    budgets.find(b=>b.id===budgetId)
    return (
     <Modal show={budgetId != null} onHide={handleClose}>
         {/* <Form onSubmit={handleSubmit}> */}
             <Modal.Header closeButton>
                 <Modal.Title>
                <Stack direction="horizontal" gap="2">
                <div>Expense -{budget?.name}</div>
                {budgetId!==UNCATEGORIZED_BUDGET_ID &&(
                    <Button onClick={()=>{
                        deleteBudget(budget) 
                        handleClose()}} 
                        variant="outline-danger">
                        Delete
                    </Button>
                )}
                </Stack>
                 </Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                     {expenses.map((expense)=>(
                         <Stack direction="horizontal" gap="2" key={expense.id}>
                             <div className='me-auto fs-4'>{expense.description}</div>
                             <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                             <Button onClick={()=>deleteExpense(expense)} variant="outline-danger" size="sm" >&times;</Button>
                         </Stack>
                     ))}
                    
                     
                 </Modal.Body>
            
         {/* </Form> */}

     </Modal>
    )
}
