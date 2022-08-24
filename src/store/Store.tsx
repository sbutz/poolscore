import React, { useEffect, createContext, Dispatch, useReducer } from 'react';
import { doc, collection, onSnapshot, addDoc, deleteDoc } from 'firebase/firestore';

import { db } from './Firebase';
import { Matchday } from './MatchdayState';

export interface Pooltable {
    id: string;
    name: string;
}

interface State {
    id: string;
    name: string;
    tables: Pooltable[];
    matchdays: Matchday[];
}
const initialState = {
    //TODO: derive club id from login
    id: 'bc73',
    name: '',
    tables: [],
    matchdays: [
        {
            id: "1",
            league: 'Landesliga',
            startTime: new Date("2022-08-01 13:00"),
            endTime: new Date("2022-08-01 17:00"),
            teams: {
                home: "BC73 Pfeffenhausen 2",
                guest: "BC Ingoldstadt 1",
            },
            winner: 'guest',
            points: {
                home: 4,
                guest: 6,
            },
            pocketPoints: {
                home: 26,
                guest: 29,
            },
            matches: [],
        },
        {
            id: "2",
            league: 'Landesliga',
            startTime: new Date("2022-07-22 13:00"),
            endTime: new Date("2022-08-01 17:00"),
            teams: {
                home: "BC73 Pfeffenhausen 2",
                guest: "BSV Paffenhofen 2",
            },
            winner: 'home',
            points: {
                home: 7,
                guest: 3,
            },
            pocketPoints: {
                home: 35,
                guest: 19,
            },
            matches: [],
        },
    ],
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
    type: 'add_table' | 'delete_table';
    tableName?: string;
    tableId?: string;
}
const asyncReducer = async (dispatch: Dispatch<Action>, state: State, action: AsyncAction) => {
    switch (action.type) {
    case 'add_table': {
        const tableRef = collection(db, "club", state.id, "tables");
        await addDoc(tableRef, { name: action.tableName!  });
        break;
    }
    case 'delete_table': {
        const tableRef = doc(db, "club", state.id, "tables", action.tableId!);
        await deleteDoc(tableRef);
        break;
    }
    default:
        throw Error(`Unknown action type: ${action.type}`);
    }
};

type AsyncDispatch<A> = (value: A) => Promise<void>
export const Context = createContext<[State,AsyncDispatch<AsyncAction>?]>([initialState]);

interface StoreProps {
    children: React.ReactNode;
}
export function Store({children} : StoreProps) {
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

export function generateId() {
    return doc(collection(db, "club")).id;
}
