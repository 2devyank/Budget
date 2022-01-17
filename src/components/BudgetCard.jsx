import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'
import {currencyFormatter} from "./Utils"

export default function BudgetCard({name,amount,max,gray}) {
    const classNames=[]
    if(amount>max){
        classNames.push("bg-danger","bg-opacity-10")

    }else if(gray){
        classNames.push("bg-light")

    }
    return (
        <Card className={classNames.join(" ")}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-3 fw-normal">
            <div>{name}</div>
            <div>{currencyFormatter.format(amount)}
            <span className='text-muted fs-6'>
                
                /{currencyFormatter.format(max)}
                </span>
                </div>
                </Card.Title>
                <ProgressBar classNAme="rounded pill" variant={getProgressBarvariant(amount,max)} gray min={0} max={max} now={amount} / >
                    <Stack className="mt-4" gap="2" direction="horizontal" >
                    <Button className="ms-auto" variant="outline-primary">
                    Add Expense
                    </Button>
                    <Button variant="outline-secondary">
                        View Expense
                    </Button>
                    </Stack>
            </Card.Body>
        </Card>
    )
}

function getProgressBarvariant({amount,max}){
    const ratio=amount/max
    if(ratio<0.5)return "primary"
    if(ratio<0.75)return "warning"
    return "danger" 
}