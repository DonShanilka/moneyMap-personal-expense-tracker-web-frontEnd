import React from 'react'
import ExpensesTable from '../../components/table/ExpensesTable'
import AddButton from '../../components/add/AddButton'

function ExpensesPage() {
    return (
        <div>
            <AddButton />
            <ExpensesTable />
        </div>
    )
}

export default ExpensesPage