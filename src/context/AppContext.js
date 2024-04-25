import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SUBMISSIONS':
            return {
                ...state,
                papers: action.payload,
            };
        default:
            return state;
    }
};

const initialState = {
    papers: [],
};

export const AppContext = createContext();
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        axios.get('http://localhost:3001/submissions')
            .then(response => {
                dispatch({ type: 'SET_SUBMISSIONS', payload: response.data });
            })
            .catch(error => {
                console.error('Error fetching submissions:', error);
            });
    }, []);

    return (
        <AppContext.Provider
        value={{
            papers: state.papers,
            dispatch,
        }}
    >
        {props.children}
        </AppContext.Provider>
    );
};
