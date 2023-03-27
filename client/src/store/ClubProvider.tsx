import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo,
} from 'react';
import { doc, updateDoc } from 'firebase/firestore';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useAuth } from './AuthProvider';
import { db } from './Firebase';

interface ClubState {
  name?: string;
  setName: (name: string) => Promise<void>;
}

const ClubContext = createContext<ClubState | undefined>(undefined);

export function useClub() {
  const value = useContext(ClubContext);
  if (value === undefined) throw new Error('Expected club context value to be set.');
  return value;
}

interface ClubProviderProps {
  children: ReactNode;
}
export default function ClubProvider({ children }: ClubProviderProps) {
  const { clubId } = useAuth();

  const clubRef = clubId ? doc(db, 'clubs', clubId) : null;
  const [clubData, , clubDataError] = useDocumentData(clubRef);
  useEffect(() => { if (clubDataError) throw clubDataError; }, [clubDataError]);

  const setName = useCallback(async (name: string) => {
    if (!clubId) throw Error("Club's id no given. Cannot update it's name.");

    await updateDoc(doc(db, 'clubs', clubId), { name });
  }, [clubId]);

  const value = useMemo(() => ({ name: clubData?.name, setName }), [clubData, setName]);

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
}
