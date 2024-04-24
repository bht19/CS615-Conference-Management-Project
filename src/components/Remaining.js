import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Remaining = () => {
    const { papers } = useContext(AppContext);
    const totalPapers = papers.length;

    const pendingAssignmentsCount = papers.filter(item => item.assigned === 0).length;
    const alertType = pendingAssignmentsCount > Math.ceil(totalPapers / 4) ? 'alert-danger' : 'alert-success';

    return (
        <div className={`alert ${alertType}`}>
            <span>Pending Assignment: {pendingAssignmentsCount}</span>
        </div>
    );
};
export default Remaining;
