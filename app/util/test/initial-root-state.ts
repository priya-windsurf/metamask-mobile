import type { RootState } from '../../reducers';
import type { EngineState } from '../../core/Engine';
import { initialState as initialFiatOrdersState } from '../../reducers/fiatOrders';
import { initialState as initialSecurityState } from '../../reducers/security';
import { initialState as initialInpageProvider } from '../../core/redux/slices/inpageProvider';
import { initialState as confirmationMetrics } from '../../core/redux/slices/confirmationMetrics';
import { initialState as originThrottling } from '../../core/redux/slices/originThrottling';
import { initialState as initialBridgeState } from '../../core/redux/slices/bridge';
import initialBackgroundState from './initial-background-state.json';
import { userInitialState } from '../../reducers/user';
import { initialNavigationState } from '../../reducers/navigation';
import { initialOnboardingState } from '../../reducers/onboarding';
import { initialState as initialPerformanceState } from '../../core/redux/slices/performance';
import { isTest } from './utils';

import { initialState as initialLegalNoticesState } from '../../reducers/legalNotices';
import { initialState as initialCollectiblesState } from '../../reducers/collectibles';
import { initialState as initialPrivacyState } from '../../reducers/privacy';
import { initialState as initialBookmarksState } from '../../reducers/bookmarks';
import { initialState as initialBrowserState } from '../../reducers/browser';
import { initialState as initialModalsState } from '../../reducers/modals';
import { initialState as initialSettingsState } from '../../reducers/settings';
import { initialState as initialAlertState } from '../../reducers/alert';
import { initialState as initialTransactionState } from '../../reducers/transaction';
import { initialState as initialWizardState } from '../../reducers/wizard';
import { initialState as initialNotificationState } from '../../reducers/notification';
import { initialState as initialInfuraAvailabilityState } from '../../reducers/infuraAvailability';
import { initialState as swapsInitialState } from '../../reducers/swaps';
import { initialState as networkOnboardedInitialState } from '../../reducers/networkSelector';
import { initialState as signatureRequestInitialState } from '../../reducers/signatureRequest';
import { initialState as experimentalSettingsInitialState } from '../../reducers/experimentalSettings';
import { initialState as rpcEventsInitialState } from '../../reducers/rpcEvents';
import { initialState as accountsInitialState } from '../../reducers/accounts';
// A cast is needed here because we use enums in some controllers, and TypeScript doesn't consider
// the string value of an enum as satisfying an enum type.
export const backgroundState: EngineState =
  initialBackgroundState as unknown as EngineState;

const initialRootState: RootState = {
  legalNotices: initialLegalNoticesState,
  collectibles: initialCollectiblesState,
  engine: { backgroundState },
  privacy: initialPrivacyState,
  bookmarks: initialBookmarksState,
  browser: initialBrowserState,
  modals: initialModalsState,
  settings: initialSettingsState,
  alert: initialAlertState,
  transaction: initialTransactionState,
  user: userInitialState,
  wizard: initialWizardState,
  onboarding: initialOnboardingState,
  notification: initialNotificationState,
  swaps: swapsInitialState,
  fiatOrders: initialFiatOrdersState,
  infuraAvailability: initialInfuraAvailabilityState,
  navigation: initialNavigationState,
  networkOnboarded: networkOnboardedInitialState,
  security: initialSecurityState,
  signatureRequest: signatureRequestInitialState,
  sdk: {
    connections: {},
    approvedHosts: {},
    dappConnections: {},
  },
  experimentalSettings: experimentalSettingsInitialState,
  rpcEvents: rpcEventsInitialState,
  accounts: accountsInitialState,
  inpageProvider: initialInpageProvider,
  confirmationMetrics,
  originThrottling,
  notifications: {},
  bridge: initialBridgeState,
  banners: {
    dismissedBanners: [],
  },
};

if (isTest) {
  initialRootState.performance = initialPerformanceState;
}

export default initialRootState;
