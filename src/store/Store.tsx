import React, { useEffect, createContext, Dispatch, useReducer } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';

import { db } from './Firebase';

interface Pooltable {
    id: string;
    name: string;
}

interface State {
    name: string;
    tables: Pooltable[];
}
const initialState = {
    name: '',
    tables: [],
} as State;

//TODO: different interface per action type
interface Action {
    type: 'set_name' | 'set_tables' | 'add_table';
    name?: string;
    tables?: Pooltable[],
}
const reducer = (state: State, action: Action) : State => {
  switch (action.type) {
    case 'set_name':
        return {...state, name: action.name!};
    case 'set_tables':
        return {...state, tables: action.tables!};
    case 'add_table':
        return state;
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

    const clubId = "mcRKaUvRToWEsJXs7O6k";

    useEffect(() => {
        //TODO: derive club id from login
        const clubRef = doc(db, "club", clubId);
        return onSnapshot(clubRef, (snapshot) => {
            if (snapshot.exists())
                dispatch({
                    type: 'set_name',
                    name: snapshot.data().name,
                });
        });
    }, []);

    useEffect(() => {
        //TODO: derive club id from login
        const tableRef = collection(db, "club", clubId, "tables");
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
