import {
  createContext, ReactNode, useCallback, useContext, useMemo,
} from 'react';
import {
  collection, deleteDoc, doc, setDoc,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { httpsCallable } from 'firebase/functions';
import { useAuth } from './AuthProvider';
import { db, functions } from './Firebase';

interface Token {
  value: string;
  expires: Date;
}

interface Table {
  name: string;
  token?: Token;
}

interface TableState {
  tables: Table[];
  addTable: (name: string) => Promise<void>;
  removeTable: (name: string) => Promise<void>;
  generateToken: (name: string) => Promise<void>;
}

const TableContext = createContext<TableState | undefined>(undefined);

export function useTables() {
  const value = useContext(TableContext);
  if (value === undefined) throw new Error('Expected tables context value to be set.');
  return value;
}

interface TableProviderProps {
  children: ReactNode;
}
export default function TableProvider({ children }: TableProviderProps) {
  const { clubId } = useAuth();

  const tablesRef = clubId ? collection(db, 'clubs', clubId, 'tables') : null;
  const [values] = useCollection(tablesRef);
  // useEffect(() => { if (error) throw error; }, [error]);

  const addTable = useCallback(async (name: string) => {
    if (!clubId) throw Error("Club's id not given. Cannot add a table.");

    const ref = doc(db, 'clubs', clubId, 'tables', name);
    await setDoc(ref, {});
  }, [clubId]);

  const removeTable = useCallback(async (name: string) => {
    if (!clubId) throw Error("Club's id not given. Cannot remove a table.");

    const ref = doc(db, 'clubs', clubId, 'tables', name);
    await deleteDoc(ref);
  }, [clubId]);

  const generateToken = useCallback(async (name: string) => {
    const createToken = httpsCallable(functions, 'table-createtoken');
    await createToken({ tableId: name });
  }, []);

  const value = useMemo(() => ({
    tables: values ? values.docs.map((d) => ({ name: d.id, ...d.data() })) : [],
    addTable,
    removeTable,
    generateToken,
  }), [values, addTable, removeTable, generateToken]);

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
}
