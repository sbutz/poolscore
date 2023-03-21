/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { unstable_useBlocker as useBlocker } from 'react-router-dom';

export default function useCallbackPrompt(when: boolean): (boolean | (() => void))[] {
  const blocker = useBlocker(when);

  const showPrompt = blocker.state === 'blocked';
  const proceed = () => { blocker.proceed?.(); };
  const reset = () => { blocker.reset?.(); };

  useEffect(() => {
    if (showPrompt && !when) {
      blocker.reset();
    }
  }, [blocker, showPrompt, when]);

  return [showPrompt, proceed, reset];
}
