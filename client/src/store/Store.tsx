import React, {
  createContext, Dispatch, useReducer, useMemo, useCallback,
} from 'react';
import {
  doc, collection, addDoc, deleteDoc,
} from 'firebase/firestore';

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
  id: 'bc73',
  name: '',
  tables: [],
  matchdays: [
    {
      id: '1',
      league: 'Landesliga',
      startTime: new Date('2022-08-01 13:00'),
      endTime: new Date('2022-08-01 17:00'),
      teams: {
        home: 'BC73 Pfeffenhausen 2',
        guest: 'BC Ingoldstadt 1',
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
      id: '2',
      league: 'Landesliga',
      startTime: new Date('2022-07-22 13:00'),
      endTime: new Date('2022-08-01 17:00'),
      teams: {
        home: 'BC73 Pfeffenhausen 2',
        guest: 'BSV Paffenhofen 2',
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

interface SetNameAction {
  type: 'set_name';
  name: string;
}
interface SetTablesAction {
  type: 'set_tables';
  tables: Pooltable[];
}
type Action = SetNameAction | SetTablesAction;

const reducer = (state: State, action: Action) : State => {
  switch (action.type) {
    case 'set_name':
      return { ...state, name: action.name! };
    case 'set_tables':
      return { ...state, tables: action.tables! };
    // no default
  }
};

interface AddTableAction {
  type: 'add_table';
  name: string;
}
interface DeleteTableAction {
  type: 'delete_table';
  id: string;
}
type AsyncAction = AddTableAction | DeleteTableAction;

const asyncReducer = async (dispatch: Dispatch<Action>, state: State, action: AsyncAction) => {
  switch (action.type) {
    case 'add_table': {
      const tableRef = collection(db, 'club', state.id, 'tables');
      await addDoc(tableRef, { name: action.name });
      break;
    }
    case 'delete_table': {
      const tableRef = doc(db, 'club', state.id, 'tables', action.id);
      await deleteDoc(tableRef);
      break;
    }
    // no default
  }
};

type AsyncDispatch<A> = (value: A) => Promise<void>;
type ContextType = [State, AsyncDispatch<AsyncAction>?];
export const Context = createContext<ContextType>([initialState]);

interface StoreProps {
  children: React.ReactNode;
}
export function Store({ children } : StoreProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = useCallback(async (a: AsyncAction) => {
    asyncReducer(dispatch, state, a);
  }, [dispatch, state]);

  const value = useMemo(() => [state, asyncDispatch] as ContextType, [state, asyncDispatch]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export function generateId() {
  return doc(collection(db, 'club')).id;
}
