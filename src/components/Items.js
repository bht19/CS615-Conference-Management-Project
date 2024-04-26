import React, { useContext, useState } from 'react';
import '../App.css';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const Items = (props) => {
    const { dispatch } = useContext(AppContext);
    const [userDetails, setUserDetails] = useState(null);
    
    const truncateAbstract = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength).trim() + '...';
        }
        return text;
    };

    const handleHover = () => {
        axios.get(`http://localhost:3001/reviewer/${props.submittedby}`)
            .then(response => {
                dispatch({ type: 'SET_USER_DETAILS', payload: response.data });
                setUserDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setUserDetails(null);
            });
    };

    const truncatedAbstract = truncateAbstract(props.abstract, 50);

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.authors}</td>
            <td>{props.keywords}</td>
            <td className="expense-abstract" data-fulltext={props.abstract}>{truncatedAbstract}</td>
            <td>
                <a className='btn btn-secondary' href={props.attachment} target="_blank" rel="noreferrer">View File</a>
            </td>
            <td className="expense-abstract" data-fulltext={
                userDetails
                ? `${userDetails.name}\n${userDetails.affiliation}\n${userDetails.affiliation_addr}\n${userDetails.email}\n${userDetails.contact}\n${userDetails.link}`
                : 'Author details not found'
                }
                onMouseEnter={handleHover}
                style={{ whiteSpace: 'pre-line' }}>
                {props.submittedby}
            </td>
        </tr>
    );
};


export default Items;
