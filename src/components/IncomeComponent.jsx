import React, { useEffect, useState } from 'react';
import { getUserIncome } from '../services/IncomeService';



const IncomeComponent = () => {
    const [income, setIncome] = useState([]);
   

    useEffect(() => {
        getUserIncome()
            .then(response => {
                setIncome(response.data);
               
            })
            .catch(error => {
                console.error('Error fetching income data:', error);
            });
    }, []);


    return (
        <div style={{ width: '300px', margin: 'auto' }}>
            {income.length > 0 ? (
                <ul>
                    {income.map((item) => (
                        <li key={item.id} style={{ fontSize: '24px', textAlign: 'center' }}>
                            Your Income: {item.income} kr
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading income data...</p>
            )}
        </div>
       
    );
};

export default IncomeComponent;
