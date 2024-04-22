import React, { useEffect, useState } from 'react'
import './style.css';
import { completeInvoice, deleteInvoice, getAllInvoice, inCompleteInvoice } from '../services/InvoiceService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser, isUserRoll } from '../services/AuthService'

import InvoiceChart from './InvoiceChart';
import InvoiceSummary from './InvoiceSummary';
import IncomeComponent from './IncomeComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';




const ListInvoiceComponent = () => {

    const [invoices, setInvoice] = useState([])

    const navigate = useNavigate()

    const isAdmin = isAdminUser();

    const isUser = isUserRoll();

    useEffect(() => {
        listInvoices();
    }, [])

    function listInvoices() {

        getAllInvoice().then((response) => {
            setInvoice(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewInvoice() {
        navigate('/add-invoice')

    }

    function updateInvoice(id) {
        console.log(id)
        navigate(`/update-invoice/${id}`)
    }

    function removeInvoice(id) {
        deleteInvoice(id).then((response) => {
            listInvoices();
        }).catch(error => {
            console.error(error)
        })
    }

    function markComplete(id) {
        completeInvoice(id).then((response) => {
            listInvoices()
        }).catch(error => {
            console.error(error)
        })
    }

    function markInComplete(id) {
        inCompleteInvoice(id).then((response) => {
            listInvoices();
        }).catch(error => {
            console.error(error)
        })
    }

    function addNewIncomes() {
        navigate('/add-income')

    }


    return (
        <div className='home' >
            <div className='left-panel'>
                <h2 className='text-center'>MANAGE YOUR EXPENSE</h2>
                <IncomeComponent/>

                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#fffbea' }}>
                    <div className='mt-3'>
                        <InvoiceSummary invoices={invoices} />
                        
                       

                    </div>

                    <div style={{ width: '300px', height: '300px', marginRight: '250px' }}>
                        <InvoiceChart invoices={invoices} />
                    </div>
                
                </div>

                <div style={{marginTop: '20px', margin: 'center'}}>
                    {isAdmin && <button className='btn btn-info mb-2' style={{ marginLeft: '30px' }} onClick={addNewInvoice}>Add Invoice</button>}
                    {isUser && <button className='btn btn-info mb-2' style={{ marginLeft: '30px' }} onClick={addNewInvoice}>Add Invoice</button>}
                    {isAdmin && <button className='btn btn-info mb-2' style={{ marginLeft: '25px' }} onClick={addNewIncomes}>Add Income</button>}
                    {isUser && <button className='btn btn-info mb-2' style={{ marginLeft: '25px' }} onClick={addNewIncomes}>Add Income</button>}
                </div>

            </div>



            <div style={{ padding: "20px", border: " solid teal 3px", width: "80%", margin: "25px" }}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name of expense</th>
                            <th> Description</th>
                            <th>Invoice Amount</th>
                            <th>Invoice Date</th>
                            <th>Invoice Paid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ backgroundColor: '#fffbea' }}>
                        {
                            invoices.map(invoice =>
                                <tr key={invoice.id}>
                                    <td>{invoice.title}</td>
                                    <td>{invoice.description}</td>
                                    <td>{invoice.amount}</td>
                                    <td>{invoice.date}</td>

                                    <td>{invoice.completed ? 'YES' : 'NO'}</td>
                                    <td>
                                        {
                                            isAdmin &&
                                            <button className='btn btn-info' onClick={() => updateInvoice(invoice.id)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                        }

                                        {
                                            isAdmin &&
                                            <button className='btn btn-danger' onClick={() => removeInvoice(invoice.id)} style={{ marginLeft: "10px" }} ><FontAwesomeIcon icon={faTrash} /></button>
                                        }

                                        {
                                            isUser &&
                                            <button className='btn btn-info' onClick={() => updateInvoice(invoice.id)}><FontAwesomeIcon icon={faPencilAlt} /></button>
                                        }

                                        {
                                            isUser &&
                                            <button className='btn btn-danger' onClick={() => removeInvoice(invoice.id)} style={{ marginLeft: "10px" }} ><FontAwesomeIcon icon={faTrash} /></button>
                                        }

                                        <button className='btn btn-success' onClick={() => markComplete(invoice.id)} style={{ marginLeft: "10px" }} >Paid</button>
                                        <button className='btn btn-info' onClick={() => markInComplete(invoice.id)} style={{ marginLeft: "10px" }} >In Complete</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default ListInvoiceComponent