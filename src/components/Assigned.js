import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
    const { papers } = useContext(AppContext);
    const papersAssigned = papers.filter(item => item.assigned === 1).length;
    
    return (
        <div className='alert alert-primary'>
            <span>Papers assigned: {papersAssigned}</span>
        </div>
    );
};
export default ExpenseTotal;
