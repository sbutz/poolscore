import React, { useEffect, createContext, Dispatch, useReducer } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from './Firebase';

interface Pooltable {
    id: string;
    name: string;
}

interface State {
    tables: Pooltable[];
}
const initialState : State = {
    tables: [],
};

interface Action {
    //TODO: fixed strings
    type: 'set_tables';
    tables: Pooltable[],
}
const reducer = (state: State, action: Action) : State => {
  switch (action.type) {
    case 'set_tables':
        return {...state, tables: action.tables};
    default:
        throw Error(`Unknown action type: ${action.type}`);
  }
};

const Context = createContext<[State,Dispatch<Action>?]>([initialState]);

interface StoreProps {
    children: React.ReactNode;
}
function Store({children} : StoreProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const tableRef = collection(db, "table");
        return onSnapshot(tableRef, (snapshot) => {
            const tmp = [] as Pooltable[];
            snapshot.forEach((doc) => {
                tmp.push({ id: doc.id, name: doc.data().name });
            });
            dispatch({
                type: 'set_tables',
                tables: tmp.sort((a, b) => a.name.localeCompare(b.name)),
            });
        });
    }, []);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export { Store, Context };
