import React, { useEffect, createContext, Dispatch, useReducer } from 'react';
import { doc, collection, onSnapshot, addDoc } from 'firebase/firestore';

import { db } from './Firebase';

interface Pooltable {
    id: string;
    name: string;
}

interface State {
    id: string;
    name: string;
    tables: Pooltable[];
}
const initialState = {
    //TODO: derive club id from login
    id: 'bc73',
    name: '',
    tables: [],
} as State;

//TODO: different interface per action type
interface Action {
    type: 'set_name' | 'set_tables';
    name?: string;
    tables?: Pooltable[],
}
const reducer = (state: State, action: Action) : State => {
  switch (action.type) {
    case 'set_name':
        return {...state, name: action.name!};
    case 'set_tables':
        return {...state, tables: action.tables!};
    default:
        throw Error(`Unknown action type: ${action.type}`);
  }
};

//TODO: interface per async action type
interface AsyncAction {
    type: 'add_table';
    tableName?: string;
}
//TODO: support normal Actions to and proxy them to the normal reducer
const asyncReducer = async (dispatch: Dispatch<Action>, state: State, action: AsyncAction) => {
    switch (action.type) {
    case 'add_table':
        const tableRef = collection(db, "club", state.id, "tables");
        await addDoc(tableRef, { name: action.tableName!  });
    }
};


type AsyncDispatch<A> = (value: A) => Promise<void>
const Context = createContext<[State,AsyncDispatch<AsyncAction>?]>([initialState]);

interface StoreProps {
    children: React.ReactNode;
}
function Store({children} : StoreProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const asyncDispatch = async (a: AsyncAction) => {
        asyncReducer(dispatch, state, a);
    };

    useEffect(() => {
        const clubRef = doc(db, "club", state.id);
        return onSnapshot(clubRef, (snapshot) => {
            if (snapshot.exists())
                dispatch({
                    type: 'set_name',
                    name: snapshot.data().name,
                });
        });
    }, [state.id]);

    useEffect(() => {
        const tableRef = collection(db, "club", state.id, "tables");
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
    }, [state.id]);

    return (
        <Context.Provider value={[state, asyncDispatch]}>
            {children}
        </Context.Provider>
    );
}

export { Store, Context };
