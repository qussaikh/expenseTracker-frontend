import React, { useEffect, useState } from 'react'
import './style.css';
import { getUserIncome, saveIncomeAPI } from '../services/IncomeService'

import { isAdminUser, isUserRoll } from '../services/AuthService'



const IncomeProcessingComponent = () => {

    const isAdmin = isAdminUser();

    const isUser = isUserRoll();

    const [income, setIncome] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!income) {
            setMessage('Please enter a valid income.');
            return;
        }
        try {
            const response = await saveIncomeAPI({ income: parseInt(income, 10) });
            if (response.status === 201) {
                setMessage('Income saved successfully!');
                setIncome('');
            } else {
                setMessage('Failed to save income.');
            }
        } catch (error) {
            setMessage('Error saving income: ' + error.message);
        }
    };

    return (
        <div className='home'>
            <br /> <br />
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className="row mb-3">
                        <div className='card-header'>
                            <h2 className='text-center'> Income Form </h2>
                        </div>

                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label' > Income: </label >
                                    <div >
                                        <input className='form-control'
                                            type="number"
                                            value={income}
                                            onChange={(e) => setIncome(e.target.value)}
                                            placeholder="Enter your income"
                                        />
                                    </div>


                                    {isAdmin && <button className='btn btn-info mb-2' style={{marginTop: '20px'}} type="submit">Save Income</button>}
                                    {isUser && <button className='btn btn-info mb-2' style={{marginTop: '20px'}} type="submit">Save Income</button>}
                                </div>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncomeProcessingComponent