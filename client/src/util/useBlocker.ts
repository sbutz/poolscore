/*
 * Stolen from https://github.com/Bilal-Bangash/detecting-route-change-react-route-dom-v6
 */
import * as React from 'react';
import { UNSAFE_NavigationContext } from 'react-router-dom';
import type { History, Blocker, Transition } from 'history';

export default function useBlocker(blocker: Blocker, when = true): void {
  const navigator = React.useContext(UNSAFE_NavigationContext)
    .navigator as History;

  React.useEffect(() => {
    if (!when) return undefined;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
