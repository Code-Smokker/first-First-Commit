// Boots the live office runtime: the host bridge, the agent activity loop and the
// task ledger. Returns a disposer so React effects can tear everything down (no
// timers survive unmount).

import './i18n';
import { installHostBridge } from './bridge/initCth';
import { startMockLedger, stopMockLedger } from './bridge/mockLedger';
import { startMockLoop, stopMockLoop } from './store/mockEvents';

export function startLiveOffice(): () => void {
  installHostBridge();
  startMockLedger();
  startMockLoop();
  return () => {
    stopMockLoop();
    stopMockLedger();
  };
}
