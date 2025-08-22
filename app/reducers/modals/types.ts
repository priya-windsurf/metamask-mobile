export interface ModalsState {
  networkModalVisible: boolean;
  shouldNetworkSwitchPopToWallet: boolean;
  collectibleContractModalVisible: boolean;
  dappTransactionModalVisible: boolean;
  signMessageModalVisible: boolean;
  infoNetworkModalVisible?: boolean;
}

export interface ToggleNetworkModalAction {
  type: 'TOGGLE_NETWORK_MODAL';
  shouldNetworkSwitchPopToWallet: boolean;
}

export interface ToggleCollectibleContractModalAction {
  type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL';
}

export interface ToggleDappTransactionModalAction {
  type: 'TOGGLE_DAPP_TRANSACTION_MODAL';
  show?: boolean | null;
}

export interface ToggleInfoNetworkModalAction {
  type: 'TOGGLE_INFO_NETWORK_MODAL';
  show?: boolean;
}

export interface ToggleSignModalAction {
  type: 'TOGGLE_SIGN_MODAL';
  show?: boolean;
}

export type ModalsAction =
  | ToggleNetworkModalAction
  | ToggleCollectibleContractModalAction
  | ToggleDappTransactionModalAction
  | ToggleInfoNetworkModalAction
  | ToggleSignModalAction;
