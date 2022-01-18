import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddbudgetModal from './components/AddbudgetModal'
import { useBudgets } from './context/BudgetContext'
import AddexpenseModal from './components/AddexpenxeModal'
import Total from './components/Total'
import View from './components/View'
function App() {
 const[showaddbudgetmodal,setshowaddbudgetmodal]=useState(false)
 const[showaddexpensemodal,setshowaddexpensemodal]=useState(false)
 const[addexpensemodalbudgetid,setaddexpensemodalbudgetid]=useState()
 const[viewid,setviewid]=useState()

const {budgets,getBudgetExpenses}=useBudgets()

function openaddexpensemodal(budgetId){
  setshowaddexpensemodal(true)
  setaddexpensemodalbudgetid(budgetId)
}
  return (
    <>
  <Container>
<Stack className="mb-4" gap="2" direction='horizontal'>
  <h1 className='me-auto'>Budgets</h1>
  <Button variant="primary" onClick={()=>setshowaddbudgetmodal(true)}>Add Budget</Button>
  <Button variant="primary-outline" onClick={()=>openaddexpensemodal(true)}>Add Expense</Button>

</Stack>
<div style={{
  display:"grid",
  gap:"1rem",
  gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
  alignItems:"flex-start"

}}>
  {budgets.map((budget)=>{
   const amount = getBudgetExpenses(budget.id).reduce(
    (total, expense) => total + expense.amount,
    0
  )
    return (
<BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} 
onAddExpenseClick={()=>openaddexpensemodal(budget.id)}
onViewExpenseClick={()=>setviewid(budget.id)}
/>

  )
  })}
<Total/>
</div>
  </Container>
  <AddbudgetModal show={showaddbudgetmodal}  handleClose={()=>setshowaddbudgetmodal(false)}/>
  <AddexpenseModal show={showaddexpensemodal}  
  defaultBudgetId={addexpensemodalbudgetid}
  handleClose={()=>setshowaddexpensemodal(false)}
  />
  <View   
  budgetId={viewid}
  handleClose={()=>setviewid()}
  />
  </>
  )
}

export default App
