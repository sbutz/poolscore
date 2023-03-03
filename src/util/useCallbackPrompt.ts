/* eslint-disable react-hooks/exhaustive-deps */
/*
 * Stolen from https://github.com/Bilal-Bangash/detecting-route-change-react-route-dom-v6
 */
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useBlocker } from './useBlocker';

export function useCallbackPrompt(when: boolean): (boolean | (() => void))[] {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation = useCallback(() => {
    setShowPrompt(false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: any) => {
      // in if condition we are checking next location and current location are equals or not
      let nextPath = nextLocation.location.pathname;
      if (nextPath.startsWith(process.env.PUBLIC_URL)) nextPath = nextPath.slice(process.env.PUBLIC_URL.length);
      if (
        !confirmedNavigation
        && nextPath !== location.pathname
      ) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation],
  );

  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      let target = lastLocation.location.pathname;
      if (target.startsWith(process.env.PUBLIC_URL)) target = target.slice(process.env.PUBLIC_URL.length);
      navigate(target);
    }
  }, [confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return [showPrompt, confirmNavigation, cancelNavigation];
}
