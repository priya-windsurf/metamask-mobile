export interface BrowserTab {
  url: string;
  id: string;
  linkType?: string;
}

export interface BrowserHistoryItem {
  url: string;
  name: string;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: BrowserHistoryItem[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: BrowserFavicon[];
  activeTab: string | null;
  visitedDappsByHostname: Record<string, boolean>;
}

export interface AddToViewedDappAction {
  type: 'ADD_TO_VIEWED_DAPP';
  hostname: string;
}

export interface AddToBrowserHistoryAction {
  type: 'ADD_TO_BROWSER_HISTORY';
  url: string;
  name: string;
}

export interface AddToBrowserWhitelistAction {
  type: 'ADD_TO_BROWSER_WHITELIST';
  url: string;
}

export interface ClearBrowserHistoryAction {
  type: 'CLEAR_BROWSER_HISTORY';
  metricsEnabled: boolean;
  marketingEnabled: boolean;
  id: string;
}

export interface CloseAllTabsAction {
  type: 'CLOSE_ALL_TABS';
}

export interface CreateNewTabAction {
  type: 'CREATE_NEW_TAB';
  url: string;
  id: string;
  linkType?: string;
}

export interface CloseTabAction {
  type: 'CLOSE_TAB';
  id: string;
}

export interface SetActiveTabAction {
  type: 'SET_ACTIVE_TAB';
  id: string;
}

export interface UpdateTabAction {
  type: 'UPDATE_TAB';
  id: string;
  data: Partial<BrowserTab>;
}

export interface StoreFaviconUrlAction {
  type: 'STORE_FAVICON_URL';
  origin: string;
  url: string;
}

export type BrowserAction =
  | AddToViewedDappAction
  | AddToBrowserHistoryAction
  | AddToBrowserWhitelistAction
  | ClearBrowserHistoryAction
  | CloseAllTabsAction
  | CreateNewTabAction
  | CloseTabAction
  | SetActiveTabAction
  | UpdateTabAction
  | StoreFaviconUrlAction;
