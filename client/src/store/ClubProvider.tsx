import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useDownloadURL, useUploadFile } from 'react-firebase-hooks/storage';
import { useAuth } from './AuthProvider';
import { db, storage } from './Firebase';

interface ClubState {
  name?: string;
  setName: (name: string) => Promise<void>;
  logo?: string;
  setLogo: (image: string) => Promise<void>;
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
    if (!clubId) throw Error("Club's id not given. Cannot update it's name.");

    await updateDoc(doc(db, 'clubs', clubId), { name });
  }, [clubId]);

  const logoRef = clubId ? ref(storage, `${clubId}/logo.jpg`) : null;
  const [logo, ,logoError] = useDownloadURL(logoRef);
  useEffect(() => { if (logoError && logoError.code !== 'storage/object-not-found') throw logoError; }, [logoError]);

  const [localLogo, setLocalLogo] = useState<string>();
  useEffect(() => { if (logo) setLocalLogo(logo); }, [logo]);
  const [uploadLogo, , , errorUploadLogo] = useUploadFile();
  useEffect(() => { if (errorUploadLogo) throw errorUploadLogo; }, [errorUploadLogo]);

  const setLogo = useCallback(async (image: string) => {
    if (!clubId || !logoRef) throw Error("Club's id not given. Cannot update it's logo.");
    const blob = await (await fetch(image)).blob();
    await uploadLogo(logoRef, blob, { contentType: 'image/png' });
    setLocalLogo(image); // browser won't refresh logo since url does not change, show local version
  }, [clubId, logoRef, uploadLogo]);

  const value = useMemo(() => ({
    name: clubData?.name, setName, logo: localLogo, setLogo,
  }), [clubData, setName, localLogo, setLogo]);

  return (
    <ClubContext.Provider value={value}>
      {children}
    </ClubContext.Provider>
  );
}
