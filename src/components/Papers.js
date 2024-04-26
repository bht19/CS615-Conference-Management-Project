import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Papers = () => {
    const { papers } = useContext(AppContext);
    const totalPapers = papers.length;

    return (
        <div className='alert alert-secondary'>
            <span>Total submissions: </span>
            <input value={totalPapers} readOnly></input>
        </div>
            );
};
export default Papers;