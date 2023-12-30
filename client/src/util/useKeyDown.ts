import { useEffect } from 'react';

export default function useKeyDown(key: string, callback: () => void) {
  const event = 'keydown';

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) callback();
    };

    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [key, event, callback]);
}
