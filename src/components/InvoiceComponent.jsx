import React, { useEffect } from 'react'
import { useState } from 'react'
import { getInvoice, saveInvoice, updateInvoice } from '../services/InvoiceService'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'

const InvoiceComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [completed, setCompleted] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()


    function saveOrUpdateInvoice(e){
        e.preventDefault()

        const invoice = {title, description, amount, date, completed}
        console.log(invoice);

        if(id){

            updateInvoice(id, invoice).then((response) => {
                navigate('/invoices')
            }).catch(error => {
                console.error(error);
            })

        }else{
            saveInvoice(invoice).then((response) => {
                console.log(response.data)
                navigate('/invoices')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    function pageTitle(){
        if(id) {
            return <h2 className='text-center'>Update Invoice</h2>
        }else {
            return <h2 className='text-center'>Add Invoice</h2>
                    
        }
    }


    useEffect( () => {

        if(id){
            getInvoice(id).then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setAmount(response.data.amount)
                setDate(response.data.date)
                setCompleted(response.data.completed)
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])

  return (
    <div style={{backgroundColor: '#fffbea'}}>
        <br /> <br />
        <div className='row' >
            <div className='card col-md-6 offset-md-3 offset-md-3' style={{backgroundColor: '#fffbea'}}>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Invoice Title:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter invoice Title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Invoice Description:</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Invoice Description'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Invoice Amount:</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter Invoice Amount'
                                name='Amount'
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Invoice date to pay:</label>
                            <input
                                type='date'
                                className='form-control'
                                placeholder='Enter Invoice date'
                                name='date'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            >
                            </input>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Invoice Paid:</label>
                            <select
                                className='form-control'
                                value={completed}
                                onChange={(e) => setCompleted(e.target.value)}
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>

                            </select>
                        </div>

                        <button className='btn btn-success' onClick={ (e) => saveOrUpdateInvoice(e)}>Submit</button>
                    </form>

                </div>
            </div>

        </div>
    </div>
  )
}

export default InvoiceComponent