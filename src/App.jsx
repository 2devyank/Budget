import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Container, Stack } from 'react-bootstrap'
import BudgetCard from './components/BudgetCard'
import AddbudgetModal from './components/AddbudgetModal'
import { useBudgets } from './context/BudgetContext'
function App() {
 const[showaddbudgetmodal,setshowaddbudgetmodal]=useState(false)

const {budgets,getBudgetExpenses}=useBudgets()
  return (
    <>
  <Container>
<Stack className="mb-4" gap="2" direction='horizontal'>
  <h1 className='me-auto'>Budgets</h1>
  <Button variant="primary" onClick={()=>setshowaddbudgetmodal(true)}>Add Budget</Button>
  <Button variant="primary-outline">Add Expense</Button>

</Stack>
<div style={{
  display:"grid",
  gap:"1rem",
  gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",
  alignItems:"flex-start"

}}>
  {budgets.map((budget)=>{
    const amount=getBudgetExpenses(budget.id)
    return (
<BudgetCard key={budget.id} name={budget.name} amount={0} max={budget.max} />

  )
  })}

</div>
  </Container>
  <AddbudgetModal show={showaddbudgetmodal}  handleClose={()=>setshowaddbudgetmodal(false)}/>
  </>
  )
}

export default App
