import React from 'react';


const InvoiceSummary = ({ invoices }) => {
    // Calculate total amount including all invoices
    const totalAmount = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);

    // Calculate total amount excluding completed invoices
    const totalAmountExcludingCompleted = invoices.reduce((sum, invoice) => {
        return invoice.completed ? sum : sum + parseFloat(invoice.amount);
    }, 0);

    

    return (
        <div className='mt-3' style={{marginLeft: '40px'}}>
            <h3>Total Amount (Unpaid Invoices Only): {totalAmountExcludingCompleted.toFixed(2)} kr</h3>
            <h3>Total Amount: {totalAmount.toFixed(2)} kr</h3>
        </div>
    );
}

export default InvoiceSummary;
