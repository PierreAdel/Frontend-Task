import * as actionTypes from './actions';

const initialState = {
    employee: {
        name: null,
        age: null,
        title: null,
        id: null
    }

};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_EMPLOYEE:
            const newEmployee = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return {
                ...state,
                employees: state.employees.concat( newEmployee )
            }
        case actionTypes.REMOVE_EMPLOYEE:
            return {
                ...state,
                employees: state.employees.filter(employee => employee.id !== action.personId)
            }
    }
    return state;
};

export default reducer;